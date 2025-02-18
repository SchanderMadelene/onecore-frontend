
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { InspectionItem } from "@/types/api";

interface InspectionCategoryProps {
  title: string;
  items: InspectionItem[];
  onItemClick: (itemId: string) => void;
}

export const InspectionCategory = ({ title, items, onItemClick }: InspectionCategoryProps) => (
  <div className="space-y-3">
    <h5 className="font-medium">{title}</h5>
    {items.map((item) => (
      <div key={item.id} className="space-y-2">
        <div className="flex justify-between items-center">
          <Button 
            variant="ghost" 
            className="p-0 h-auto hover:bg-transparent hover:underline"
            onClick={() => onItemClick(item.id)}
          >
            {item.name}
          </Button>
          <Badge 
            variant={item.condition === 'good' ? 'secondary' : 'destructive'}
            className="cursor-pointer"
            onClick={() => onItemClick(item.id)}
          >
            {item.condition === 'good' ? 'Godkänt' : 'Anmärkning'}
          </Badge>
        </div>
      </div>
    ))}
  </div>
);
