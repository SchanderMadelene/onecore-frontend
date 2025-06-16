
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { TreeItemProps } from "./types";
import { getNodeIcon } from "./treeViewUtils";
import { Badge } from "../ui/badge";

export function TreeItem({ node, level = 0, onNavigate }: TreeItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  
  const hasChildren = node.children && node.children.length > 0;
  const isActive = node.path === location.pathname;
  const indent = level * 16;

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const content = (
    <div className="flex items-center gap-2 flex-1 min-w-0">
      {getNodeIcon(node.icon)}
      <div className="flex-1 min-w-0">
        <div className="truncate text-sm">{node.label}</div>
        {node.area && (
          <Badge variant="outline" className="text-xs h-4 px-1 mt-1">
            {node.area}
          </Badge>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <div 
        className={`
          flex items-center py-1.5 px-2 rounded-md transition-colors cursor-pointer
          ${isActive 
            ? 'bg-primary text-primary-foreground shadow-sm' 
            : 'hover:bg-muted/50'
          }
        `}
        style={{ marginLeft: `${indent}px` }}
      >
        {/* Expand button */}
        {hasChildren && (
          <button
            onClick={handleToggle}
            className="p-1 hover:bg-background/10 rounded mr-1"
          >
            <ChevronRight 
              className={`h-3 w-3 transition-transform ${
                isExpanded ? 'rotate-90' : ''
              }`} 
            />
          </button>
        )}

        {/* Content */}
        {node.path ? (
          <Link 
            to={node.path} 
            className="flex-1 min-w-0"
            onClick={onNavigate}
          >
            {content}
          </Link>
        ) : (
          <div className="flex-1 min-w-0">{content}</div>
        )}
      </div>
      
      {/* Children */}
      {hasChildren && isExpanded && (
        <div>
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
