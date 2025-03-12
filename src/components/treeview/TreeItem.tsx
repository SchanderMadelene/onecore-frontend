
import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, MapPin, Tag, FolderOpen, Folder } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { TreeItemProps } from "./types";
import { getNodeIcon } from "./treeViewUtils";
import { Badge } from "../ui/badge";

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

  const getFolderIcon = () => {
    if (isExpanded) {
      return <FolderOpen className="h-4 w-4 text-accent" />;
    }
    return <Folder className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <div className="flex flex-col">
      <div
        className={`
          flex items-center rounded-lg px-2 py-1.5 cursor-pointer transition-colors
          ${isActive 
            ? 'bg-primary/10 text-primary font-medium' 
            : isExpanded 
              ? 'bg-accent/10 text-foreground' 
              : 'hover:bg-accent/10'}
          ${node.path ? 'hover:text-accent' : ''} 
          ${isExpanded ? 'border-l-2 border-accent/80 shadow-sm' : ''}
        `}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
      >
        {hasChildren ? (
          <Button
            variant="ghost"
            size="icon"
            className={`h-5 w-5 p-0 mr-1 ${isExpanded ? 'text-accent' : 'text-muted-foreground'} hover:text-foreground hover:bg-transparent`}
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
            <span className={`mr-2 ${isExpanded ? 'text-accent' : ''}`}>
              {node.icon === 'building' && hasChildren ? getFolderIcon() : getNodeIcon(node.icon)}
            </span>
            <div className="flex flex-col">
              <div className="flex items-center">
                {node.label}
                {isActive && (
                  <MapPin className="h-3 w-3 ml-2 text-primary" />
                )}
              </div>
              {node.area && (
                <Badge variant="outline" className="text-xs px-1 py-0 h-5 mt-1 bg-accent/5">
                  <Tag className="h-3 w-3 mr-1" />
                  {node.area}
                </Badge>
              )}
            </div>
          </Link>
        ) : (
          <span className={`flex items-center text-sm ${isActive || isParentOfActive ? 'font-medium' : ''} ${isExpanded ? 'text-accent' : ''}`}>
            <span className={`mr-2 ${isExpanded ? 'text-accent' : ''}`}>
              {node.icon === 'building' && hasChildren ? getFolderIcon() : getNodeIcon(node.icon)}
            </span>
            {node.label}
          </span>
        )}
      </div>
      <div className={`
        ${isExpanded ? 'animate-fade-in' : 'hidden'}
        ${hasChildren ? 'border-l border-accent/30 ml-3' : ''}
      `}>
        {isExpanded &&
          hasChildren &&
          node.children.map((child) => (
            <TreeItem key={child.id} node={child} level={level + 1} onNavigate={onNavigate} />
          ))}
      </div>
    </div>
  );
}
