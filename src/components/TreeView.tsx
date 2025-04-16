
import { TreeView as TreeViewComponent } from "./treeview";
import { TreeViewProps } from "./treeview/types";

export function TreeView(props: TreeViewProps) {
  return <TreeViewComponent {...props} />;
}
