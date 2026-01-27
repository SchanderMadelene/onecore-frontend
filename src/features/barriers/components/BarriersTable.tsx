import React, { useState } from "react";
import { ResponsiveTable } from "@/components/ui/responsive-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Barrier } from "../types";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { DeleteBarrierDialog } from "./DeleteBarrierDialog";
import { EditBarrierDialog } from "./EditBarrierDialog";

interface BarriersTableProps {
  barriers: Barrier[];
  onBarrierUpdated?: () => void;
}

const getStatusBadge = (status: Barrier['status']) => {
  switch (status) {
    case 'active':
      return <Badge variant="destructive">Aktiv</Badge>;
    case 'inactive':
      return <Badge variant="secondary">Inaktiv</Badge>;
    case 'expired':
      return <Badge variant="outline">Utgången</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('sv-SE');
};

export function BarriersTable({ barriers, onBarrierUpdated }: BarriersTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedBarrier, setSelectedBarrier] = useState<Barrier | null>(null);
  const [focusEndDate, setFocusEndDate] = useState(false);

  const handleDeleteClick = (barrier: Barrier) => {
    setSelectedBarrier(barrier);
    setDeleteDialogOpen(true);
  };

  const handleEditClick = (barrier: Barrier, shouldFocusEndDate = false) => {
    setSelectedBarrier(barrier);
    setFocusEndDate(shouldFocusEndDate);
    setEditDialogOpen(true);
  };

  const handleDelete = () => {
    // TODO: Implement actual delete logic
    console.log('Delete barrier:', selectedBarrier);
    onBarrierUpdated?.();
  };

  const handleSave = (updatedBarrier: Barrier) => {
    // TODO: Implement actual save logic
    console.log('Save barrier:', updatedBarrier);
    onBarrierUpdated?.();
  };

  return (
    <>
      <ResponsiveTable
      data={barriers}
      columns={[
        {
          key: "object",
          label: "Objekt",
          render: (barrier) => <span className="font-medium">{barrier.object}</span>,
        },
        {
          key: "address",
          label: "Adress",
          render: (barrier) => barrier.address,
          hideOnMobile: true,
        },
        {
          key: "reason",
          label: "Orsak",
          render: (barrier) => barrier.reason,
        },
        {
          key: "createdDate",
          label: "Skapad",
          render: (barrier) => formatDate(barrier.createdDate),
          hideOnMobile: true,
        },
        {
          key: "startDate",
          label: "Startdatum",
          render: (barrier) => formatDate(barrier.startDate),
          hideOnMobile: true,
        },
        {
          key: "endDate",
          label: "Slutdatum",
          render: (barrier) => barrier.endDate ? formatDate(barrier.endDate) : '-',
          hideOnMobile: true,
        },
        {
          key: "status",
          label: "Status",
          render: (barrier) => getStatusBadge(barrier.status),
        },
        {
          key: "createdBy",
          label: "Skapad av",
          render: (barrier) => barrier.createdBy,
          hideOnMobile: true,
        },
        {
          key: "actions",
          label: "Åtgärder",
          render: (barrier) => (
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0"
                onClick={() => handleEditClick(barrier)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0"
                onClick={() => handleDeleteClick(barrier)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ),
          className: "w-24",
        },
      ]}
      keyExtractor={(barrier) => barrier.id}
      emptyMessage="Inga spärrar hittades"
      mobileCardRenderer={(barrier) => (
        <div className="space-y-3 w-full">
          <div className="flex justify-between items-start">
            <div>
              <div className="font-medium">{barrier.object}</div>
              <div className="text-sm text-muted-foreground">{barrier.address}</div>
            </div>
            {getStatusBadge(barrier.status)}
          </div>
          <div className="text-sm">
            <div className="font-medium text-muted-foreground mb-1">Orsak</div>
            <div>{barrier.reason}</div>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Skapad av: {barrier.createdBy}</span>
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0"
                onClick={() => handleEditClick(barrier)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0"
                onClick={() => handleDeleteClick(barrier)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    />
    
    {selectedBarrier && (
      <>
        <DeleteBarrierDialog
          barrier={selectedBarrier}
          isOpen={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onEdit={() => {
            setDeleteDialogOpen(false);
            handleEditClick(selectedBarrier, true);
          }}
          onDelete={handleDelete}
        />
        
        <EditBarrierDialog
          barrier={selectedBarrier}
          isOpen={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          onSave={handleSave}
          focusEndDate={focusEndDate}
        />
      </>
    )}
    </>
  );
}