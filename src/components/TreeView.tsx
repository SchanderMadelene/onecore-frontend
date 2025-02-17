
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

interface TreeNode {
  id: string;
  label: string;
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
            {node.label}
          </Link>
        ) : (
          <span className="text-sm">{node.label}</span>
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
      id: "1",
      label: "Fastigheter",
      children: [
        {
          id: "1-1",
          label: "Stockholm",
          children: [
            { id: "1-1-1", label: "Vasastan", path: "/properties/stockholm/vasastan" },
            { id: "1-1-2", label: "Södermalm", path: "/properties/stockholm/sodermalm" },
          ],
        },
        {
          id: "1-2",
          label: "Göteborg",
          children: [
            { id: "1-2-1", label: "Centrum", path: "/properties/gothenburg/centrum" },
            { id: "1-2-2", label: "Hisingen", path: "/properties/gothenburg/hisingen" },
          ],
        },
      ],
    },
    {
      id: "2",
      label: "Hyresgäster",
      children: [
        { id: "2-1", label: "Företag", path: "/tenants/companies" },
        { id: "2-2", label: "Privatpersoner", path: "/tenants/private" },
      ],
    },
  ];

  return (
    <div className="p-2">
      {treeData.map((node) => (
        <TreeItem key={node.id} node={node} onNavigate={onNavigate} />
      ))}
    </div>
  );
}
