
import { Button } from "@/components/ui/button";
import { Check, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";

interface RoomActionsProps {
  isApproved: boolean;
  isHandled: boolean;
  isExpanded: boolean;
  onApprove: (e: React.MouseEvent) => void;
  onMarkHandled: (e: React.MouseEvent) => void;
  onToggle: (e: React.MouseEvent) => void;
}

export const RoomActions = ({ 
  isApproved, 
  isHandled,
  isExpanded, 
  onApprove, 
  onMarkHandled,
  onToggle 
}: RoomActionsProps) => {
  return (
    <div className="flex items-center gap-3">
      {!isApproved && isHandled && (
        <Button 
          type="button"
          variant="outline" 
          size="sm"
          className="text-amber-600 border-amber-600 hover:bg-amber-50 hover:text-amber-700"
          onClick={onMarkHandled}
        >
          <CheckCircle className="mr-2 h-4 w-4" />
          Hanterat
        </Button>
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
