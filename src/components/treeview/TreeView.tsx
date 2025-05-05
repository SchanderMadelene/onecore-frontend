
import { useState, useEffect } from "react";
import { TreeItem } from "./TreeItem";
import { TreeViewProps } from "./types";
import { treeData } from "./treeData";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function TreeView({ 
  onNavigate, 
  showRentals, 
  showDesignSystem,
  showProperties,
  showTenants,
  showBuildings,
  showApartments 
}: TreeViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTreeData, setFilteredTreeData] = useState(treeData);
  
  useEffect(() => {
    // First filter based on feature toggles
    const toggleFilteredData = treeData.filter(node => {
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

    // Then filter based on search query
    if (searchQuery.trim() === "") {
      setFilteredTreeData(toggleFilteredData);
      return;
    }

    const query = searchQuery.toLowerCase();
    
    // Search in the tree recursively
    const searchInNodes = (nodes) => {
      return nodes
        .map(node => {
          // Check if this node matches
          const nodeMatches = node.label.toLowerCase().includes(query);
          
          // Check if any children match
          let matchingChildren = [];
          if (node.children && node.children.length > 0) {
            matchingChildren = searchInNodes(node.children);
          }
          
          // If this node matches or has matching children, include it
          if (nodeMatches) {
            // If this node matches, include it with all its children
            return {
              ...node,
              children: node.children // Keep all children
            };
          } else if (matchingChildren.length > 0) {
            // If children match, include this node with matching children
            return {
              ...node,
              children: matchingChildren
            };
          }
          
          // No match
          return null;
        })
        .filter(Boolean); // Remove nulls
    };
    
    setFilteredTreeData(searchInNodes(toggleFilteredData));
  }, [searchQuery, showRentals, showDesignSystem, showProperties, showTenants, showBuildings, showApartments]);

  return (
    <div className="p-4 overflow-y-auto bg-secondary w-full h-full flex flex-col">
      <div className="mb-4 relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          type="search"
          placeholder="Sök i trädet..."
          className="w-full pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="w-full flex-1 overflow-y-auto">
        {filteredTreeData.length > 0 ? (
          filteredTreeData.map((node) => (
            <TreeItem key={node.id} node={node} onNavigate={onNavigate} />
          ))
        ) : (
          <div className="text-muted-foreground text-center py-4">
            Inga resultat hittades
          </div>
        )}
      </div>
    </div>
  );
}
