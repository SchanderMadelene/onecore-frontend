
import { useMemo } from "react";
import { TreeItem } from "./TreeItem";
import { TreeViewProps } from "./types";
import { treeData } from "./treeData";
import { useIsMobile } from "@/hooks/use-mobile";

export function TreeView({ 
  onNavigate, 
  showRentals, 
  showDesignSystem,
  showProperties,
  showTenants,
  showBuildings,
  showApartments 
}: TreeViewProps) {
  const isMobile = useIsMobile();
  
  const filteredData = useMemo(() => {
    return treeData.filter(node => {
      if (node.id === "properties") return showProperties;
      if (node.id === "tenants") return showTenants;
      if (node.id === "rentals") return showRentals;
      if (node.id === "design-system") return showDesignSystem;
      return true;
    }).map(node => {
      if (node.id === "properties" && node.children) {
        return {
          ...node,
          children: node.children.map(propertyNode => ({
            ...propertyNode,
            children: showBuildings ? propertyNode.children?.map(buildingNode => ({
              ...buildingNode,
              children: showApartments ? buildingNode.children : []
            })) : []
          }))
        };
      }
      return node;
    });
  }, [showRentals, showDesignSystem, showProperties, showTenants, showBuildings, showApartments]);

  return (
    <div className={`${isMobile ? 'p-2' : 'p-4'} h-full overflow-y-auto bg-white`}>
      <div className="space-y-1">
        {filteredData.length > 0 ? (
          filteredData.map((node) => (
            <TreeItem key={node.id} node={node} onNavigate={onNavigate} />
          ))
        ) : (
          <div className={`text-gray-500 text-center py-8 ${isMobile ? 'text-xs' : 'text-sm'}`}>
            Inga resultat hittades
          </div>
        )}
      </div>
    </div>
  );
}
