import { TreeItem } from "./TreeItem";
import { TreeViewProps } from "./types";
import { treeData } from "./treeData";

export function TreeView({ onNavigate, showRentals, showDesignSystem }: TreeViewProps) {
  // Filter the tree data based on feature toggles
  const filteredTreeData = treeData.filter(node => {
    // If node area is "rentals" and showRentals is false, hide it
    if (node.area === "rentals" && !showRentals) {
      return false;
    }
    
    // If node area is "design-system" and showDesignSystem is false, hide it
    if (node.area === "design-system" && !showDesignSystem) {
      return false;
    }
    
    // Otherwise, show the node
    return true;
  });

  return (
    <div className="p-4 overflow-y-auto bg-secondary w-full h-full">
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-foreground px-2">NAVIGATION</h3>
      </div>
      <div className="w-full">
        {filteredTreeData.map((node) => (
          <TreeItem key={node.id} node={node} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  );
}
