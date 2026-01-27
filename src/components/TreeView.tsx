import { TreeView as TreeViewComponent } from "@/features/treeview/components";
import { TreeViewProps } from "@/features/treeview/types";

export function TreeView(props: TreeViewProps) {
  return <TreeViewComponent {...props} />;
}
