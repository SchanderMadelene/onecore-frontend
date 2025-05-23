
import { CheckCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface RoomStatusProps {
  isHandled: boolean;
  name: string;
  onClick: (e: React.MouseEvent) => void;
}

export const RoomStatus = ({ isHandled, name, onClick }: RoomStatusProps) => {
  const isMobile = useIsMobile();
  
  return (
    <button
      type="button"
      className={`text-left flex items-center gap-1.5 transition-colors w-full sm:w-auto ${
        isHandled
          ? 'text-slate-700 hover:text-slate-800'
          : 'hover:text-primary/80'
      }`}
      onClick={onClick}
    >
      {isHandled && (
        <CheckCircle className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-slate-600 shrink-0`} />
      )}
      <span className={`font-semibold ${isMobile ? 'text-sm' : 'text-base'} truncate`}>{name}</span>
    </button>
  );
};
