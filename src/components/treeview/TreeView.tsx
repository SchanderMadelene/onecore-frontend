import { TreeItem } from "./TreeItem";
import { TreeViewProps } from "./types";
import { treeData } from "./treeData";

export function TreeView({ 
  onNavigate, 
  showRentals, 
  showDesignSystem,
  showProperties,
  showTenants 
}: TreeViewProps) {
  const filteredData = treeData.filter(node => {
    // Filter out main navigation nodes based on feature toggles
    if (node.id === "properties") return showProperties;
    if (node.id === "tenants") return showTenants;
    if (node.id === "rentals") return showRentals;
    if (node.id === "design-system") return showDesignSystem;
    
    // For remaining nodes, apply the area filtering logic
    if (!node.area) return true;

    // Show areas only if their respective features are enabled
    if (node.area === 'rentals') return showRentals;
    if (node.area === 'design-system') return showDesignSystem;

    return true;
  });

  return (
    <div className="p-4 overflow-y-auto bg-secondary w-full h-full">
      <div className="w-full">
        {filteredData.map((node) => (
          <TreeItem key={node.id} node={node} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  );
}
