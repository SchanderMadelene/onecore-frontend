
import type { InspectionItem } from "@/types/api";
import { InspectionCategory } from "./inspection-category";

interface InspectionCategoriesProps {
  items: Record<string, InspectionItem[]>;
  onItemClick: (itemId: string) => void;
}

export const InspectionCategories = ({ items, onItemClick }: InspectionCategoriesProps) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
    {Object.entries(items).map(([category, categoryItems]) => (
      <InspectionCategory
        key={category}
        title={
          category === 'floor' ? 'Golv' :
          category === 'wall' ? 'Väggar' :
          category === 'ceiling' ? 'Tak' :
          'Vitvaror'
        }
        items={categoryItems}
        onItemClick={onItemClick}
      />
    ))}
  </div>
);
