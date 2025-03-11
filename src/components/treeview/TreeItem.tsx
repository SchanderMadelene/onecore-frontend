
import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, MapPin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { TreeItemProps } from "./types";
import { getNodeIcon } from "./treeViewUtils";

export function TreeItem({ node, level = 0, onNavigate }: TreeItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = node.children && node.children.length > 0;
  const location = useLocation();
  const isActive = node.path && location.pathname === node.path;
  const isParentOfActive = node.children && node.children.some(child => 
    child.path && location.pathname.includes(child.path)
  );

  useEffect(() => {
    // Auto-expand parents of active item
    if (isParentOfActive) {
      setIsExpanded(true);
    }
  }, [isParentOfActive, location.pathname]);

  const handleNodeClick = () => {
    if (!hasChildren && node.path && onNavigate) {
      onNavigate();
    }
  };

  return (
    <div className="flex flex-col">
      <div
        className={`
          flex items-center rounded-lg px-2 py-1.5 cursor-pointer transition-colors
          ${isActive 
            ? 'bg-primary/10 text-primary font-medium' 
            : 'hover:bg-accent/10'}
          ${node.path ? 'hover:text-accent' : ''} 
        `}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
      >
        {hasChildren ? (
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 p-0 mr-1 text-muted-foreground hover:text-foreground hover:bg-transparent"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        ) : (
          <div className="w-6" />
        )}
        {node.path ? (
          <Link 
            to={node.path} 
            className={`flex items-center text-sm py-1 flex-1 ${isActive ? 'font-medium' : ''}`}
            onClick={handleNodeClick}
          >
            <span className="mr-2">{getNodeIcon(node.icon)}</span>
            {node.label}
            {isActive && (
              <MapPin className="h-3 w-3 ml-2 text-primary" />
            )}
          </Link>
        ) : (
          <span className={`flex items-center text-sm ${isActive || isParentOfActive ? 'font-medium' : ''}`}>
            <span className="mr-2">{getNodeIcon(node.icon)}</span>
            {node.label}
          </span>
        )}
      </div>
      {isExpanded &&
        hasChildren &&
        node.children.map((child) => (
          <TreeItem key={child.id} node={child} level={level + 1} onNavigate={onNavigate} />
        ))}
    </div>
  );
}
