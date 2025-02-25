
import { Check, CheckCircle } from "lucide-react";

interface RoomStatusProps {
  isApproved: boolean;
  isHandled: boolean;
  name: string;
  onClick: (e: React.MouseEvent) => void;
}

export const RoomStatus = ({ isApproved, isHandled, name, onClick }: RoomStatusProps) => {
  return (
    <button
      type="button"
      className={`flex-1 text-left flex items-center gap-2 transition-colors ${
        isApproved 
          ? 'text-green-700 hover:text-green-800' 
          : isHandled
            ? 'text-slate-700 hover:text-slate-800'
            : 'hover:text-primary/80'
      }`}
      onClick={onClick}
    >
      {isApproved ? (
        <Check className="h-5 w-5 text-green-600 shrink-0" />
      ) : isHandled && (
        <CheckCircle className="h-5 w-5 text-slate-600 shrink-0" />
      )}
      <span className="font-semibold text-base">{name}</span>
    </button>
  );
};
