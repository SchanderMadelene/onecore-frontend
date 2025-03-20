
import { Button } from "@/components/ui/button";
import { CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RoomActionsProps {
  isHandled: boolean;
  isExpanded: boolean;
  onToggle: (e: React.MouseEvent) => void;
  isMobile?: boolean;
}

export const RoomActions = ({ 
  isHandled,
  isExpanded, 
  onToggle,
  isMobile = false
}: RoomActionsProps) => {
  return (
    <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
      {isHandled && (
        <Badge variant="secondary" className="gap-1 text-xs">
          <CheckCircle className="h-3 w-3" />
          {!isMobile ? 'Hanterat' : ''}
        </Badge>
      )}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="p-0 hover:bg-transparent"
        onClick={onToggle}
      >
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
        )}
      </Button>
    </div>
  );
};
