
import { TreeNode } from "./types";
import { propertiesNode } from "./data/properties";
import { navigationNodes } from "./data/navigation";

export const treeData: TreeNode[] = [
  propertiesNode,
  ...navigationNodes
];
