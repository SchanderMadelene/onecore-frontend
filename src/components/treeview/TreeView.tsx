
import { TreeItem } from "./TreeItem";
import { TreeViewProps } from "./types";
import { treeData } from "./treeData";

export function TreeView({ onNavigate }: TreeViewProps) {
  return (
    <div className="p-4 overflow-y-auto bg-[#F1F1F1]">
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-muted-foreground px-2">NAVIGATION</h3>
      </div>
      {treeData.map((node) => (
        <TreeItem key={node.id} node={node} onNavigate={onNavigate} />
      ))}
    </div>
  );
}
