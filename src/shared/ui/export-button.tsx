import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download } from "lucide-react";

interface ExportButtonProps {
  onExport: () => void;
  disabled?: boolean;
  count?: number;
}

export function ExportButton({ onExport, disabled, count }: ExportButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onExport}
      disabled={disabled}
      className="gap-2"
    >
      <Download className="h-4 w-4" />
      Exportera{count !== undefined ? ` (${count})` : ''}
    </Button>
  );
}
