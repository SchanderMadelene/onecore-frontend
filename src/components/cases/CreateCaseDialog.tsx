
import { FilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CaseForm, Case } from "./CaseForm";
import { useState } from "react";
import { useCasesService } from "@/hooks/useCasesService";

type CreateCaseDialogProps = {
  buttonSize?: "default" | "sm" | "lg" | "icon";
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  contextType?: "tenant" | "residence";
  onCaseCreated?: () => void;
};

export function CreateCaseDialog({ 
  buttonSize = "default", 
  buttonVariant = "default",
  contextType = "tenant",
  onCaseCreated
}: CreateCaseDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { createCase } = useCasesService();

  const handleCreateCase = (caseData: Omit<Case, "id" | "status" | "reportedDate">) => {
    createCase({
      ...caseData,
      reportedDate: new Date().toISOString().split('T')[0],
      status: "active"
    });

    setIsOpen(false);
    
    if (onCaseCreated) {
      onCaseCreated();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size={buttonSize} variant={buttonVariant}>
          <FilePlus className="mr-2 h-4 w-4" />
          Skapa ärende
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Skapa nytt ärende</DialogTitle>
        </DialogHeader>
        <CaseForm 
          onSubmit={handleCreateCase}
          onCancel={() => setIsOpen(false)} 
          contextType={contextType}
        />
      </DialogContent>
    </Dialog>
  );
}
