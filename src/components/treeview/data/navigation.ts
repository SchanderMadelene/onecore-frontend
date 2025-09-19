
import { TreeNode } from "../types";

export const navigationNodes: TreeNode[] = [
  {
    id: "tenants",
    label: "Kunder",
    icon: "contact",
    path: "/tenants/all",
  },
  {
    id: "rentals",
    label: "Uthyrning",
    icon: "key",
    path: "/rentals",
  },
  {
    id: "barriers",
    label: "Spärrar",
    icon: "shield-x",
    path: "/barriers",
  },
  {
    id: "turnover",
    label: "In- och utflytt",
    icon: "arrow-right-left",
    path: "/turnover",
  },
  {
    id: "design-system",
    label: "Design System",
    icon: "palette",
    path: "/design-system",
  }
];
