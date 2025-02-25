
import { Button } from "@/components/ui/button";
import { Check, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RoomActionsProps {
  isApproved: boolean;
  isHandled: boolean;
  isExpanded: boolean;
  onApprove: (e: React.MouseEvent) => void;
  onToggle: (e: React.MouseEvent) => void;
}

export const RoomActions = ({ 
  isApproved, 
  isHandled,
  isExpanded, 
  onApprove,
  onToggle 
}: RoomActionsProps) => {
  return (
    <div className="flex items-center gap-3">
      {!isApproved && isHandled && (
        <Badge variant="muted" className="gap-1.5">
          <CheckCircle className="h-3 w-3" />
          Hanterat
        </Badge>
      )}
      <Button 
        type="button"
        variant="outline" 
        size="sm"
        className={`pointer-events-auto transition-colors ${
          isApproved 
            ? 'text-green-700 border-green-200 bg-green-50 hover:bg-green-100 hover:border-green-300 hover:text-green-800'
            : 'text-green-600 border-green-600 hover:bg-green-50 hover:border-green-600 hover:text-green-600'
        }`}
        onClick={onApprove}
      >
        <Check className="mr-2 h-4 w-4" />
        {isApproved ? 'Godkänt' : 'Godkänn rum'}
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="p-0 hover:bg-transparent"
        onClick={onToggle}
      >
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
        )}
      </Button>
    </div>
  );
};
