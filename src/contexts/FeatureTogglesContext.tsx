import React, { createContext, useContext, useState, useEffect } from 'react';

interface FeatureToggles {
  showNavigation: boolean;
  showRentals: boolean;
  showDesignSystem: boolean;
  showProperties: boolean;
  showTenants: boolean;
  showBuildings: boolean;
  showApartments: boolean;
  showRoomInformation: boolean;
  showInspections: boolean;
  showApartmentIssues: boolean;
  showResidenceNotes: boolean;
  showTenantInfo: boolean;
  showDocuments: boolean;
  showFloorplan: boolean;
  showResidenceAccess: boolean;
  // Tenant detail page tabs
  showTenantContracts: boolean;
  showTenantQueue: boolean;
  showTenantCases: boolean;
  showTenantLedger: boolean;
  showTenantNotes: boolean;
  showTenantKeys: boolean;
  showTenantEvents: boolean;
  showTenantDocuments: boolean;
  // Rentals sections
  showRentalsHousing: boolean;
  showRentalsParking: boolean;
  showRentalsStorage: boolean;
  // Property detail page tabs
  showPropertyInfo: boolean;
  showPropertyStatistics: boolean;
  showPropertyDocuments: boolean;
  showPropertyPlanning: boolean;
  showPropertyBuildings: boolean;
  showPropertyMaintenance: boolean;
  showPropertyOrders: boolean;
  showPropertyAccess: boolean;
  showPropertyMap: boolean;
  // Building detail page tabs
  showBuildingEntrances: boolean;
  showBuildingParts: boolean;
  showBuildingSpaces: boolean;
  showBuildingInstallations: boolean;
  showBuildingParking: boolean;
  showBuildingDocuments: boolean;
  // Barriers (Spärrar)
  showBarriers: boolean;
  // Turnover (In- och utflytt)
  showTurnover: boolean;
  // Global inspections view
  showAllInspections: boolean;
}

interface FeatureTogglesContextType {
  features: FeatureToggles;
  handleFeatureToggle: (feature: keyof FeatureToggles) => void;
}

const DEFAULT_FEATURES: FeatureToggles = {
  showNavigation: true,
  showRentals: false,
  showDesignSystem: false,
  showProperties: true,
  showTenants: false,
  showBuildings: true,
  showApartments: true,
  showRoomInformation: false,
  showInspections: true,
  showApartmentIssues: false,
  showResidenceNotes: false,
  showTenantInfo: false,
  showDocuments: false,
  showFloorplan: false,
  showResidenceAccess: false,
  // Tenant detail page tabs
  showTenantContracts: false,
  showTenantQueue: false,
  showTenantCases: false,
  showTenantLedger: false,
  showTenantNotes: false,
  showTenantKeys: false,
  showTenantEvents: true,
  showTenantDocuments: true,
  // Rentals sections
  showRentalsHousing: false,
  showRentalsParking: false,
  showRentalsStorage: false,
  // Property detail page tabs
  showPropertyInfo: true,
  showPropertyStatistics: true,
  showPropertyDocuments: true,
  showPropertyPlanning: false,
  showPropertyBuildings: true,
  showPropertyMaintenance: true,
  showPropertyOrders: true,
  showPropertyAccess: false,
  showPropertyMap: true,
  // Building detail page tabs
  showBuildingEntrances: false,
  showBuildingParts: false,
  showBuildingSpaces: false,
  showBuildingInstallations: false,
  showBuildingParking: false,
  showBuildingDocuments: true,
  // Barriers (Spärrar)
  showBarriers: false,
  // Turnover (In- och utflytt)
  showTurnover: false,
  // Global inspections view
  showAllInspections: true,
};

const FeatureTogglesContext = createContext<FeatureTogglesContextType | undefined>(undefined);

export function FeatureTogglesProvider({ children }: { children: React.ReactNode }) {
  const [features, setFeatures] = useState<FeatureToggles>(() => {
    try {
      const savedFeatures = localStorage.getItem('featureToggles');
      if (savedFeatures) {
        const parsedFeatures = JSON.parse(savedFeatures);
        // Merge with defaults to handle any new features added
        return { ...DEFAULT_FEATURES, ...parsedFeatures };
      }
    } catch (error) {
      console.error('Error loading feature toggles from localStorage:', error);
    }
    return DEFAULT_FEATURES;
  });

  useEffect(() => {
    localStorage.setItem('featureToggles', JSON.stringify(features));
  }, [features]);

  const handleFeatureToggle = (feature: keyof FeatureToggles) => {
    setFeatures(prev => {
      const newFeatures = { ...prev };
      
      if (feature === 'showNavigation' && !prev.showNavigation) {
        newFeatures.showNavigation = true;
      } else if (feature === 'showNavigation' && prev.showNavigation) {
        Object.keys(newFeatures).forEach(key => {
          newFeatures[key as keyof FeatureToggles] = false;
        });
      } else if (feature === 'showProperties' && !prev.showProperties) {
        newFeatures.showProperties = true;
      } else if (feature === 'showProperties' && prev.showProperties) {
        newFeatures.showProperties = false;
        newFeatures.showBuildings = false;
        newFeatures.showApartments = false;
      } else if (feature === 'showRentals' && !prev.showRentals) {
        newFeatures.showRentals = true;
      } else if (feature === 'showRentals' && prev.showRentals) {
        newFeatures.showRentals = false;
        newFeatures.showRentalsHousing = false;
        newFeatures.showRentalsParking = false;
        newFeatures.showRentalsStorage = false;
      } else if (feature === 'showBuildings' && !prev.showBuildings) {
        newFeatures.showBuildings = true;
      } else if (feature === 'showBuildings' && prev.showBuildings) {
        newFeatures.showBuildings = false;
        newFeatures.showBuildingEntrances = false;
        newFeatures.showBuildingParts = false;
        newFeatures.showBuildingSpaces = false;
        newFeatures.showBuildingInstallations = false;
        newFeatures.showBuildingParking = false;
      } else {
        newFeatures[feature] = !prev[feature];
      }
      
      return newFeatures;
    });
  };

  return (
    <FeatureTogglesContext.Provider value={{ features, handleFeatureToggle }}>
      {children}
    </FeatureTogglesContext.Provider>
  );
}

export function useFeatureToggles() {
  const context = useContext(FeatureTogglesContext);
  if (context === undefined) {
    throw new Error('useFeatureToggles must be used within a FeatureTogglesProvider');
  }
  return context;
}
