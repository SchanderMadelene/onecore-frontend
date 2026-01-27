
import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { TreeItemProps } from "./types";
import { getNodeIcon } from "./treeViewUtils";
import { useIsMobile } from "@/hooks/use-mobile";

export function TreeItem({ node, level = 0, onNavigate }: TreeItemProps) {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const hasChildren = node.children && node.children.length > 0;
  const isActive = node.path === location.pathname;
  
  // Check if any child is active (recursively)
  const isChildActive = (children: typeof node.children): boolean => {
    if (!children) return false;
    return children.some(child => 
      child.path === location.pathname || isChildActive(child.children)
    );
  };
  
  const hasActiveChild = hasChildren && isChildActive(node.children);
  
  // Auto-expand if this node or any child is active
  const [isExpanded, setIsExpanded] = useState(isActive || hasActiveChild);
  
  // Update expansion when route changes
  useEffect(() => {
    if (isActive || hasActiveChild) {
      setIsExpanded(true);
    }
  }, [location.pathname, isActive, hasActiveChild]);

  const handleExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  // Calculate padding based on mobile/desktop and level
  const paddingLeft = isMobile ? 8 + level * 12 : 12 + level * 16;
  const minHeight = isMobile ? 44 : 36; // 44px touch target on mobile

  const ItemContent = () => (
    <div 
      className={`
        flex items-center gap-2 rounded-md cursor-pointer transition-all duration-150
        ${isActive 
          ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-500' 
          : hasActiveChild
          ? 'bg-blue-25 text-blue-600'
          : 'text-gray-700 hover:bg-gray-50'
        }
      `}
      style={{ 
        paddingLeft: `${paddingLeft}px`, 
        paddingRight: isMobile ? '8px' : '12px',
        paddingTop: isMobile ? '12px' : '8px',
        paddingBottom: isMobile ? '12px' : '8px',
        minHeight: `${minHeight}px`
      }}
    >
      {hasChildren && (
        <button
          onClick={handleExpand}
          className={`rounded transition-colors flex items-center justify-center ${
            isMobile ? 'p-2 hover:bg-gray-200' : 'p-0.5 hover:bg-gray-200'
          }`}
          style={{ minWidth: isMobile ? '32px' : '20px', minHeight: isMobile ? '32px' : '20px' }}
        >
          <ChevronRight 
            className={`transition-transform ${
              isMobile ? 'h-5 w-5' : 'h-4 w-4'
            } ${isExpanded ? 'rotate-90' : ''}`} 
          />
        </button>
      )}
      
      {!hasChildren && <div className={isMobile ? 'w-8' : 'w-5'} />}
      
      <div className="flex items-center gap-2 flex-1 min-w-0">
        {getNodeIcon(node.icon)}
        <span className={`truncate font-medium ${isMobile ? 'text-sm' : 'text-sm'}`}>
          {node.label}
        </span>
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
        <div className={isMobile ? 'mt-1' : 'mt-1'}>
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
