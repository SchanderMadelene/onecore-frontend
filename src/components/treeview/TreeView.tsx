
import { useMemo } from "react";
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
  
  const filteredData = useMemo(() => {
    return treeData.filter(node => {
      // Filter main navigation nodes
      if (node.id === "properties") return showProperties;
      if (node.id === "tenants") return showTenants;
      if (node.id === "rentals") return showRentals;
      if (node.id === "design-system") return showDesignSystem;
      return true;
    }).map(node => {
      // Filter property children if needed
      if (node.id === "properties" && node.children) {
        return {
          ...node,
          children: node.children.map(propertyNode => ({
            ...propertyNode,
            children: propertyNode.children?.filter(buildingNode => {
              if (!showBuildings) return false;
              return {
                ...buildingNode,
                children: showApartments ? buildingNode.children : []
              };
            })
          }))
        };
      }
      return node;
    });
  }, [showRentals, showDesignSystem, showProperties, showTenants, showBuildings, showApartments]);

  return (
    <div className="p-4 overflow-y-auto bg-secondary w-full h-full">
      {filteredData.length > 0 ? (
        filteredData.map((node) => (
          <TreeItem key={node.id} node={node} onNavigate={onNavigate} />
        ))
      ) : (
        <div className="text-muted-foreground text-center py-4">
          Inga resultat hittades
        </div>
      )}
    </div>
  );
}
