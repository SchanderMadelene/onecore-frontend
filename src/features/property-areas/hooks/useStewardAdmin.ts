import { useState, useCallback, useMemo, useEffect } from 'react';
import { PropertyReassignment, PropertyForAdmin, StewardInfo } from '../types/admin-types';
import { getAllPropertyAreas, getUniqueStewards, getKvvArea } from '../data';
import { useToast } from '@/hooks/use-toast';

export function useStewardAdmin(selectedCostCenter: string) {
  const { toast } = useToast();
  
  // Get all property areas and build initial assignments
  const allPropertyAreas = getAllPropertyAreas();
  const allStewards = getUniqueStewards();
  
  // Filter by cost center
  const filteredAreas = useMemo(() => {
    if (selectedCostCenter === 'all') return allPropertyAreas;
    return allPropertyAreas.filter(area => area.costCenter === selectedCostCenter);
  }, [allPropertyAreas, selectedCostCenter]);
  
  // Current assignments (mutable state)
  const [assignments, setAssignments] = useState<Map<string, string>>(() => new Map());
  
  // Pending changes
  const [pendingChanges, setPendingChanges] = useState<PropertyReassignment[]>([]);
  
  // Reset assignments when cost center changes
  useEffect(() => {
    const newAssignments = new Map<string, string>();
    filteredAreas.forEach(area => {
      newAssignments.set(area.id, area.stewardRefNr);
    });
    setAssignments(newAssignments);
    setPendingChanges([]);
  }, [selectedCostCenter]);
  
  // Get stewards for the selected cost center
  const stewardsInCostCenter = useMemo((): StewardInfo[] => {
    const stewardRefNrs = new Set(filteredAreas.map(a => a.stewardRefNr));
    return allStewards
      .filter(s => stewardRefNrs.has(s.refNr))
      .map(s => ({
        refNr: s.refNr,
        name: s.name,
        phone: s.phone,
        kvvArea: getKvvArea(s.refNr),
        propertyCount: filteredAreas.filter(a => assignments.get(a.id) === s.refNr).length
      }));
  }, [filteredAreas, allStewards, assignments]);
  
  // Get properties grouped by steward
  const propertiesBySteward = useMemo(() => {
    const grouped = new Map<string, PropertyForAdmin[]>();
    
    stewardsInCostCenter.forEach(steward => {
      grouped.set(steward.refNr, []);
    });
    
    filteredAreas.forEach(area => {
      const stewardRefNr = assignments.get(area.id) || area.stewardRefNr;
      const properties = grouped.get(stewardRefNr) || [];
      properties.push({
        id: area.id,
        propertyCode: area.propertyCode,
        propertyName: area.propertyName,
        address: area.address,
        buildingType: area.buildingType,
        stewardRefNr: stewardRefNr,
        costCenter: area.costCenter
      });
      grouped.set(stewardRefNr, properties);
    });
    
    return grouped;
  }, [filteredAreas, stewardsInCostCenter, assignments]);
  
  // Check if there are unsaved changes
  const isDirty = pendingChanges.length > 0;
  
  // Move a property to a new steward
  const moveProperty = useCallback((propertyId: string, toStewardRefNr: string) => {
    const property = filteredAreas.find(a => a.id === propertyId);
    if (!property) return;
    
    const currentStewardRefNr = assignments.get(propertyId) || property.stewardRefNr;
    if (currentStewardRefNr === toStewardRefNr) return;
    
    const fromSteward = allStewards.find(s => s.refNr === currentStewardRefNr);
    const toSteward = allStewards.find(s => s.refNr === toStewardRefNr);
    
    if (!fromSteward || !toSteward) return;
    
    // Update assignments
    setAssignments(prev => {
      const newMap = new Map(prev);
      newMap.set(propertyId, toStewardRefNr);
      return newMap;
    });
    
    // Check if this reverts a previous change
    const existingChangeIndex = pendingChanges.findIndex(c => c.propertyId === propertyId);
    
    if (existingChangeIndex >= 0) {
      const existingChange = pendingChanges[existingChangeIndex];
      // If we're moving back to the original steward, remove the change
      if (existingChange.fromSteward.refNr === toStewardRefNr) {
        setPendingChanges(prev => prev.filter((_, i) => i !== existingChangeIndex));
        return;
      }
      // Otherwise, update the existing change
      setPendingChanges(prev => prev.map((c, i) => 
        i === existingChangeIndex 
          ? { ...c, toSteward: { refNr: toSteward.refNr, name: toSteward.name }, timestamp: new Date() }
          : c
      ));
    } else {
      // Add new pending change
      setPendingChanges(prev => [...prev, {
        propertyId,
        propertyName: property.propertyName,
        fromSteward: { refNr: fromSteward.refNr, name: fromSteward.name },
        toSteward: { refNr: toSteward.refNr, name: toSteward.name },
        timestamp: new Date()
      }]);
    }
  }, [filteredAreas, allStewards, assignments, pendingChanges]);
  
  // Undo a specific change
  const undoChange = useCallback((propertyId: string) => {
    const change = pendingChanges.find(c => c.propertyId === propertyId);
    if (!change) return;
    
    // Revert assignment
    setAssignments(prev => {
      const newMap = new Map(prev);
      newMap.set(propertyId, change.fromSteward.refNr);
      return newMap;
    });
    
    // Remove from pending changes
    setPendingChanges(prev => prev.filter(c => c.propertyId !== propertyId));
  }, [pendingChanges]);
  
  // Cancel all changes
  const cancelAllChanges = useCallback(() => {
    const originalAssignments = new Map<string, string>();
    filteredAreas.forEach(area => {
      originalAssignments.set(area.id, area.stewardRefNr);
    });
    setAssignments(originalAssignments);
    setPendingChanges([]);
  }, [filteredAreas]);
  
  // Save all changes
  const saveChanges = useCallback(() => {
    // In a real app, this would call an API
    // For now, we just show a success message
    toast({
      title: "Ändringar sparade",
      description: `${pendingChanges.length} ${pendingChanges.length === 1 ? 'ändring' : 'ändringar'} har sparats.`
    });
    
    // Clear pending changes (keep assignments as they are)
    setPendingChanges([]);
  }, [pendingChanges, toast]);
  
  // Reassign all properties from one steward to another (area reassignment)
  const reassignArea = useCallback((fromStewardRefNr: string, toStewardRefNr: string) => {
    const propertiesInArea = filteredAreas.filter(a => 
      (assignments.get(a.id) || a.stewardRefNr) === fromStewardRefNr
    );
    
    propertiesInArea.forEach(property => {
      moveProperty(property.id, toStewardRefNr);
    });
  }, [filteredAreas, assignments, moveProperty]);
  
  return {
    stewardsInCostCenter,
    propertiesBySteward,
    allStewards,
    pendingChanges,
    isDirty,
    moveProperty,
    reassignArea,
    undoChange,
    cancelAllChanges,
    saveChanges
  };
}
