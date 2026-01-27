import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Barrier } from "../types";

interface DeleteBarrierDialogProps {
  barrier: Barrier;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function DeleteBarrierDialog({
  barrier,
  isOpen,
  onOpenChange,
  onEdit,
  onDelete,
}: DeleteBarrierDialogProps) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const { toast } = useToast();

  const handleDelete = () => {
    onDelete();
    toast({
      title: "Spärr raderad",
      description: `Spärren för ${barrier.object} har raderats`,
    });
    setShowConfirmDelete(false);
    onOpenChange(false);
  };

  const handleEdit = () => {
    onEdit();
    onOpenChange(false);
  };

  // If in confirmation state, show delete confirmation
  if (showConfirmDelete) {
    return (
      <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bekräfta radering</AlertDialogTitle>
            <AlertDialogDescription>
              Är du säker på att spärren för <strong>{barrier.object}</strong> är felaktig och ska raderas permanent?
              <br /><br />
              Denna åtgärd kan inte ångras.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowConfirmDelete(false)}>
              Avbryt
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Radera spärr
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  // Initial dialog - different content based on status
  if (barrier.status === 'active') {
    return (
      <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hantera aktiv spärr</AlertDialogTitle>
            <AlertDialogDescription className="space-y-3">
              <p>
                Spärren för <strong>{barrier.object}</strong> är aktiv.
              </p>
              <p>
                <strong>Vill du avsluta spärren?</strong><br />
                Redigera slutdatumet för att avsluta spärren vid ett specifikt datum.
              </p>
              <p>
                <strong>Är spärren felaktigt skapad?</strong><br />
                Om spärren aldrig skulle ha skapats kan du radera den permanent.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel>Avbryt</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={() => setShowConfirmDelete(true)}
            >
              Radera spärr
            </Button>
            <Button onClick={handleEdit}>
              Redigera slutdatum
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  // For inactive/expired barriers - direct delete confirmation
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Radera spärr</AlertDialogTitle>
          <AlertDialogDescription>
            Är du säker på att du vill radera spärren för <strong>{barrier.object}</strong>?
            <br /><br />
            Denna åtgärd kan inte ångras.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Avbryt</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Radera
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
