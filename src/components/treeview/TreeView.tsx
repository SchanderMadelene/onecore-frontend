import { TreeItem } from "./TreeItem";
import { TreeViewProps } from "./types";
import { treeData } from "./treeData";

export function TreeView({ onNavigate }: TreeViewProps) {
  const filteredData = treeData.filter(node => {
    // Keep non-area specific items
    if (!node.area) return true;

    // Show rentals area only if showRentals is true
    if (node.area === 'rentals' && !showRentals) return false;

    // Show design system area only if showDesignSystem is true
    if (node.area === 'design-system' && !showDesignSystem) return false;

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
