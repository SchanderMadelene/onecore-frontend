
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

interface TreeNode {
  id: string;
  label: string;
  icon?: string;
  path?: string;
  children?: TreeNode[];
}

interface TreeItemProps {
  node: TreeNode;
  level?: number;
  onNavigate?: () => void;
}

function TreeItem({ node, level = 0, onNavigate }: TreeItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  const handleNodeClick = () => {
    if (!hasChildren && node.path && onNavigate) {
      onNavigate();
    }
  };

  return (
    <div className="flex flex-col">
      <div
        className="flex items-center hover:bg-accent/10 rounded-lg px-2 py-1 cursor-pointer"
        style={{ paddingLeft: `${level * 12 + 8}px` }}
      >
        {hasChildren ? (
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        ) : (
          <div className="w-4" />
        )}
        {node.path ? (
          <Link 
            to={node.path} 
            className="flex-1 text-sm py-1"
            onClick={handleNodeClick}
          >
            {node.icon && <span className="mr-2">{node.icon}</span>}
            {node.label}
          </Link>
        ) : (
          <span className="text-sm">
            {node.icon && <span className="mr-2">{node.icon}</span>}
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

export function TreeView({ onNavigate }: { onNavigate?: () => void }) {
  const treeData: TreeNode[] = [
    {
      id: "company",
      label: "Företag",
      icon: "🏢",
      children: [
        {
          id: "properties",
          label: "Fastigheter",
          icon: "🏛",
          children: [
            { id: "prop-id", label: "ID", icon: "📜" },
            { id: "prop-code", label: "Kod", icon: "📜" },
            { id: "prop-municipality", label: "Kommun", icon: "📍" },
            { id: "prop-area", label: "Areal", icon: "📐" },
            {
              id: "buildings",
              label: "Byggnader",
              icon: "🏗",
              children: [
                {
                  id: "building",
                  label: "Byggnad",
                  icon: "🏗",
                  children: [
                    { id: "building-id", label: "ID", icon: "📜" },
                    { id: "building-type", label: "Byggnadstyp", icon: "🏗" },
                    {
                      id: "construction",
                      label: "Konstruktion",
                      icon: "🔨",
                      children: [
                        { id: "construction-year", label: "Byggår", icon: "📅" },
                        { id: "renovation-year", label: "Renoveringsår", icon: "📅" }
                      ]
                    },
                    {
                      id: "staircases",
                      label: "Trapphus",
                      icon: "🏠",
                      children: [
                        {
                          id: "staircase",
                          label: "Trapphus",
                          icon: "🏠",
                          children: [
                            { id: "staircase-id", label: "ID", icon: "📜" },
                            { id: "floor-plan", label: "Planlösning", icon: "📍" },
                            {
                              id: "residences",
                              label: "Lägenheter",
                              icon: "🚪",
                              children: [
                                {
                                  id: "residence",
                                  label: "Lägenhet",
                                  icon: "🚪",
                                  children: [
                                    { id: "residence-id", label: "ID", icon: "📜" },
                                    { id: "residence-code", label: "Kod", icon: "📜" },
                                    { id: "residence-name", label: "Namn", icon: "🏷" },
                                    {
                                      id: "validity-period",
                                      label: "Giltighetstid",
                                      icon: "🏠",
                                      children: [
                                        { id: "from-date", label: "Från", icon: "🗓" },
                                        { id: "to-date", label: "Till", icon: "🗓" }
                                      ]
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  return (
    <div className="p-2">
      {treeData.map((node) => (
        <TreeItem key={node.id} node={node} onNavigate={onNavigate} />
      ))}
    </div>
  );
}
