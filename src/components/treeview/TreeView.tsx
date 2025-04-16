
import { TreeItem } from "./TreeItem";
import { TreeViewProps } from "./types";
import { treeData } from "./treeData";

export function TreeView({ onNavigate, showRentals, showDesignSystem }: TreeViewProps) {
  const filteredData = treeData.filter(node => {
    // Filter out rentals node entirely if showRentals is false
    if (node.id === "rentals") return showRentals;
    
    // Filter out design-system node entirely if showDesignSystem is false
    if (node.id === "design-system") return showDesignSystem;
    
    // For remaining nodes, apply the area filtering logic
    if (!node.area) return true;

    // Show rentals area only if showRentals is true
    if (node.area === 'rentals') return showRentals;

    // Show design system area only if showDesignSystem is true
    if (node.area === 'design-system') return showDesignSystem;

    return true;
  });

  return (
    <div className="p-4 overflow-y-auto bg-secondary w-full h-full">
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-foreground px-2">NAVIGATION</h3>
      </div>
      <div className="w-full">
        {filteredData.map((node) => (
          <TreeItem key={node.id} node={node} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  );
}
