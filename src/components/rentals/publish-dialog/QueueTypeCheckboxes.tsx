
import { Checkbox } from "@/components/ui/checkbox";
import { ParkingSpaceForPublishing } from "@/features/rentals/hooks/useParkingSpaceListings";

interface QueueTypeCheckboxesProps {
  space: ParkingSpaceForPublishing;
  index: number;
  onQueueTypeChange: (index: number, queueType: 'intern' | 'external' | 'poangfri', checked: boolean) => void;
}

export const QueueTypeCheckboxes = ({ space, index, onQueueTypeChange }: QueueTypeCheckboxesProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id={`intern-${index}`}
          checked={space.queueTypes.intern}
          onCheckedChange={(checked) => onQueueTypeChange(index, 'intern', !!checked)}
        />
        <label htmlFor={`intern-${index}`} className="text-sm">Intern</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox 
          id={`external-${index}`}
          checked={space.queueTypes.external}
          onCheckedChange={(checked) => onQueueTypeChange(index, 'external', !!checked)}
        />
        <label htmlFor={`external-${index}`} className="text-sm">Extern</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox 
          id={`poangfri-${index}`}
          checked={space.queueTypes.poangfri}
          onCheckedChange={(checked) => onQueueTypeChange(index, 'poangfri', !!checked)}
        />
        <label htmlFor={`poangfri-${index}`} className="text-sm">Poängfri</label>
      </div>
    </div>
  );
};
