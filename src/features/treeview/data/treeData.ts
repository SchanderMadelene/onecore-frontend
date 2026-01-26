
import { TreeNode } from "../types";
import { propertiesNode } from "./properties";
import { navigationNodes } from "./navigation";

export const treeData: TreeNode[] = [
  propertiesNode,
  ...navigationNodes
];
