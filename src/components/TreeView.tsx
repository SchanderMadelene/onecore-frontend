
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
      id: "fastigheter",
      label: "Fastigheter",
      icon: "🏛",
      children: [
        {
          id: "vasastan",
          label: "Vasastan",
          icon: "📍",
          children: [
            {
              id: "odenplan-5",
              label: "Odenplan 5",
              icon: "🏢",
              children: [
                {
                  id: "building-a",
                  label: "Huvudbyggnad",
                  icon: "🏗",
                  children: [
                    {
                      id: "entrance-1",
                      label: "Trapphus A",
                      icon: "🏠",
                      children: [
                        {
                          id: "apt-1001",
                          label: "Lägenhet 1001",
                          icon: "🚪",
                          path: "/properties/stockholm/vasastan/odenplan-5/1001"
                        },
                        {
                          id: "apt-1002",
                          label: "Lägenhet 1002",
                          icon: "🚪",
                          path: "/properties/stockholm/vasastan/odenplan-5/1002"
                        }
                      ]
                    },
                    {
                      id: "entrance-2",
                      label: "Trapphus B",
                      icon: "🏠",
                      children: [
                        {
                          id: "apt-2001",
                          label: "Lägenhet 2001",
                          icon: "🚪",
                          path: "/properties/stockholm/vasastan/odenplan-5/2001"
                        },
                        {
                          id: "apt-2002",
                          label: "Lägenhet 2002",
                          icon: "🚪",
                          path: "/properties/stockholm/vasastan/odenplan-5/2002"
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              id: "sveavagen-10",
              label: "Sveavägen 10",
              icon: "🏢",
              children: [
                {
                  id: "building-b",
                  label: "Kontorsbyggnad",
                  icon: "🏗",
                  children: [
                    {
                      id: "entrance-3",
                      label: "Entré Syd",
                      icon: "🏠",
                      children: [
                        {
                          id: "office-101",
                          label: "Kontor 101",
                          icon: "🚪",
                          path: "/properties/stockholm/vasastan/sveavagen-10/101"
                        },
                        {
                          id: "office-102",
                          label: "Kontor 102",
                          icon: "🚪",
                          path: "/properties/stockholm/vasastan/sveavagen-10/102"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: "sodermalm",
          label: "Södermalm",
          icon: "📍",
          children: [
            {
              id: "gotgatan-15",
              label: "Götgatan 15",
              icon: "🏢",
              children: [
                {
                  id: "building-c",
                  label: "Bostadshus",
                  icon: "🏗",
                  children: [
                    {
                      id: "entrance-4",
                      label: "Trapphus 1",
                      icon: "🏠",
                      children: [
                        {
                          id: "apt-3001",
                          label: "Lägenhet 3001",
                          icon: "🚪",
                          path: "/properties/stockholm/sodermalm/gotgatan-15/3001"
                        },
                        {
                          id: "apt-3002",
                          label: "Lägenhet 3002",
                          icon: "🚪",
                          path: "/properties/stockholm/sodermalm/gotgatan-15/3002"
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
