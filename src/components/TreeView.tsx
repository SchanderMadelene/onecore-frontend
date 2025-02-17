
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
}

interface TreeItemProps {
  node: TreeNode;
  level?: number;
}

function TreeItem({ node, level = 0 }: TreeItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

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
        <span className="text-sm">{node.label}</span>
      </div>
      {isExpanded &&
        hasChildren &&
        node.children.map((child) => (
          <TreeItem key={child.id} node={child} level={level + 1} />
        ))}
    </div>
  );
}

export function TreeView() {
  const treeData: TreeNode[] = [
    {
      id: "1",
      label: "Fastigheter",
      children: [
        {
          id: "1-1",
          label: "Stockholm",
          children: [
            { id: "1-1-1", label: "Vasastan" },
            { id: "1-1-2", label: "Södermalm" },
          ],
        },
        {
          id: "1-2",
          label: "Göteborg",
          children: [
            { id: "1-2-1", label: "Centrum" },
            { id: "1-2-2", label: "Hisingen" },
          ],
        },
      ],
    },
    {
      id: "2",
      label: "Hyresgäster",
      children: [
        { id: "2-1", label: "Företag" },
        { id: "2-2", label: "Privatpersoner" },
      ],
    },
  ];

  return (
    <div className="p-2">
      {treeData.map((node) => (
        <TreeItem key={node.id} node={node} />
      ))}
    </div>
  );
}
