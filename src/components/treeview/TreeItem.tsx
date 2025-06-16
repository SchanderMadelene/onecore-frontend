
import { useState, useEffect } from "react";
import { ChevronRight, MapPin, Tag } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { TreeItemProps } from "./types";
import { getNodeIcon } from "./treeViewUtils";
import { Badge } from "../ui/badge";

export function TreeItem({ node, level = 0, onNavigate }: TreeItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  
  const hasChildren = node.children && node.children.length > 0;
  const isActive = node.path && location.pathname === node.path;
  const isParentOfActive = hasChildren && node.children!.some(child => 
    child.path && location.pathname.includes(child.path)
  );

  // Auto-expand if parent of active route
  useEffect(() => {
    if (isParentOfActive && !isExpanded) {
      setIsExpanded(true);
    }
  }, [isParentOfActive, isExpanded]);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const renderIcon = () => {
    const iconMap: Record<string, React.ReactNode> = {
      "properties": getNodeIcon("location"),
      "buildings": getNodeIcon("building"),
      "apartments": getNodeIcon("home"),
      "tenants": getNodeIcon("users"),
      "rentals": getNodeIcon("key"),
      "design-system": getNodeIcon("palette"),
    };
    
    return iconMap[node.id] || getNodeIcon(node.icon);
  };

  const nodeContent = (
    <>
      <span className="mr-3 flex-shrink-0">
        {renderIcon()}
      </span>
      <div className="flex flex-col min-w-0 flex-1">
        <div className="flex items-center">
          <span className="truncate">{node.label}</span>
          {isActive && <MapPin className="h-3 w-3 ml-2 text-primary flex-shrink-0" />}
        </div>
        {node.area && (
          <Badge variant="outline" className="text-xs px-1 py-0 h-auto mt-1 self-start">
            <Tag className="h-3 w-3 mr-1" />
            <span>{node.area}</span>
          </Badge>
        )}
      </div>
    </>
  );

  return (
    <div className="w-full">
      <div
        className={`
          flex items-center px-3 py-2 cursor-pointer transition-colors
          ${isActive ? 'bg-white text-foreground font-medium shadow-sm rounded-lg' : 'hover:bg-white/60 rounded-lg'}
        `}
        style={{ paddingLeft: `${level * 12 + 16}px` }}
      >
        {/* Expand/Collapse Button */}
        {hasChildren && (
          <button
            onClick={toggleExpanded}
            className="h-5 w-5 mr-2 flex-shrink-0 flex items-center justify-center hover:bg-white/60 rounded"
          >
            <ChevronRight 
              className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} 
            />
          </button>
        )}
        
        {!hasChildren && <div className="w-7 mr-1 flex-shrink-0" />}
        
        {/* Node Content */}
        {node.path ? (
          <Link 
            to={node.path} 
            className="flex items-center text-sm flex-1 min-w-0"
            onClick={onNavigate}
          >
            {nodeContent}
          </Link>
        ) : (
          <div className="flex items-center text-sm flex-1 min-w-0">
            {nodeContent}
          </div>
        )}
      </div>
      
      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="ml-4 border-l border-border/30 pl-2">
          {node.children!.map((child) => (
            <TreeItem key={child.id} node={child} level={level + 1} onNavigate={onNavigate} />
          ))}
        </div>
      )}
    </div>
  );
}
