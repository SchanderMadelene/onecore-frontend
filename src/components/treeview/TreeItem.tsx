
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { TreeItemProps } from "./types";
import { getNodeIcon } from "./treeViewUtils";

export function TreeItem({ node, level = 0, onNavigate }: TreeItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  
  const hasChildren = node.children && node.children.length > 0;
  const isActive = node.path === location.pathname;

  const handleExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const ItemContent = () => (
    <div 
      className={`
        flex items-center gap-2 py-2 px-3 rounded-md cursor-pointer transition-all duration-150
        ${isActive 
          ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-500' 
          : 'text-gray-700 hover:bg-gray-50'
        }
      `}
      style={{ paddingLeft: `${12 + level * 16}px` }}
    >
      {hasChildren && (
        <button
          onClick={handleExpand}
          className="p-0.5 hover:bg-gray-200 rounded transition-colors"
        >
          <ChevronRight 
            className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} 
          />
        </button>
      )}
      
      {!hasChildren && <div className="w-5" />}
      
      <div className="flex items-center gap-2 flex-1 min-w-0">
        {getNodeIcon(node.icon)}
        <span className="truncate font-medium">{node.label}</span>
      </div>
    </div>
  );

  return (
    <div>
      {node.path ? (
        <Link to={node.path} onClick={onNavigate}>
          <ItemContent />
        </Link>
      ) : (
        <ItemContent />
      )}
      
      {hasChildren && isExpanded && (
        <div className="mt-1">
          {node.children!.map((child) => (
            <TreeItem 
              key={child.id} 
              node={child} 
              level={level + 1} 
              onNavigate={onNavigate} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
