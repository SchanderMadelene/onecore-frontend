
import { TreeItem } from "./TreeItem";
import { TreeViewProps } from "./types";
import { treeData } from "./treeData";

export function TreeView({ 
  onNavigate, 
  showRentals, 
  showDesignSystem,
  showProperties,
  showTenants,
  showBuildings,
  showApartments 
}: TreeViewProps) {
  const filteredData = treeData.filter(node => {
    // Filter out main navigation nodes based on feature toggles
    if (node.id === "properties") return showProperties;
    if (node.id === "tenants") return showTenants;
    if (node.id === "rentals") return showRentals;
    if (node.id === "design-system") return showDesignSystem;

    return true;
  }).map(node => {
    // If it's a property node, filter its children based on building/apartment toggles
    if (node.id === "properties" && node.children) {
      return {
        ...node,
        children: node.children.map(propertyNode => {
          if (!propertyNode.children) return propertyNode;
          
          return {
            ...propertyNode,
            children: propertyNode.children.filter(buildingNode => {
              if (!showBuildings) return false;
              
              // If it's a building node with apartment children
              if (buildingNode.children) {
                return {
                  ...buildingNode,
                  children: showApartments ? buildingNode.children : []
                };
              }
              return true;
            })
          };
        })
      };
    }
    return node;
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
