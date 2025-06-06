import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, MapPin, Tag, Building, Users, Home, Key, Palette, FileText } from "lucide-react";
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
    if (isParentOfActive) {
      setIsExpanded(true);
    }
  }, [isParentOfActive, location.pathname]);

  const handleNodeClick = () => {
    if (!hasChildren && node.path && onNavigate) {
      onNavigate();
    }
  };

  const renderNodeIcon = () => {
    switch (node.id) {
      case "properties":
        return <Building className="h-4 w-4 text-muted-foreground" />;
      case "buildings":
        return <Building className="h-4 w-4 text-muted-foreground" />;
      case "apartments":
        return <Home className="h-4 w-4 text-muted-foreground" />;
      case "tenants":
        return <Users className="h-4 w-4 text-muted-foreground" />;
      case "rentals":
        return <Key className="h-4 w-4 text-muted-foreground" />;
      case "design-system":
        return <Palette className="h-4 w-4 text-muted-foreground" />;
      default:
        return getNodeIcon(node.icon);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div
        className={`
          flex items-center rounded-full px-3 py-2 cursor-pointer transition-colors
          text-ellipsis whitespace-nowrap w-full
          ${isActive 
            ? 'bg-white text-foreground font-medium shadow-sm' 
            : isExpanded 
              ? 'text-foreground hover:bg-white/60' 
              : 'hover:bg-white/60'}
          ${node.path ? 'hover:bg-white/60' : ''} 
        `}
        style={{ paddingLeft: `${level * 12 + 16}px` }}
      >
        {hasChildren ? (
          <Button
            variant="ghost"
            size="icon"
            className={`h-5 w-5 p-0 mr-2 flex-shrink-0 ${isExpanded ? 'text-foreground' : 'text-muted-foreground'} hover:text-foreground hover:bg-transparent`}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        ) : (
          <div className="w-6 mr-1 flex-shrink-0" />
        )}
        
        {node.path ? (
          <Link 
            to={node.path} 
            className={`flex items-center text-sm py-1 flex-1 min-w-0 ${isActive ? 'font-medium' : ''}`}
            onClick={handleNodeClick}
          >
            <span className="mr-3 text-foreground flex-shrink-0">
              {renderNodeIcon()}
            </span>
            <div className="flex flex-col text-foreground min-w-0">
              <div className="flex items-center w-full overflow-hidden">
                <span className="break-words">{node.label}</span>
                {isActive && (
                  <MapPin className="h-3 w-3 ml-2 text-primary flex-shrink-0" />
                )}
              </div>
              {node.area && (
                <Badge variant="outline" className="text-xs px-1 py-0 h-auto mt-1 bg-accent/5 w-full">
                  <Tag className="h-3 w-3 mr-1 flex-shrink-0" />
                  <span className="break-words">{node.area}</span>
                </Badge>
              )}
            </div>
          </Link>
        ) : (
          <span className={`flex items-center text-sm text-foreground w-full ${isActive || isParentOfActive ? 'font-medium' : ''}`}>
            <span className="mr-3 text-foreground flex-shrink-0">
              {renderNodeIcon()}
            </span>
            <span className="break-words">{node.label}</span>
          </span>
        )}
      </div>
      
      {hasChildren && (
        <div className={`
          ${isExpanded ? 'animate-fade-in' : 'hidden'}
          relative ml-4 w-full
        `}>
          {isExpanded && (
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border"></div>
          )}
          <div className="pl-2 w-full">
            {isExpanded &&
              node.children.map((child) => (
                <TreeItem key={child.id} node={child} level={level + 1} onNavigate={onNavigate} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
