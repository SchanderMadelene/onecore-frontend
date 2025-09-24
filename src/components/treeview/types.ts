
import { ReactNode } from "react";

export interface TreeNode {
  id: string;
  label: string;
  icon?: string;
  path?: string;
  area?: string;
  children?: TreeNode[];
}

export interface TreeItemProps {
  node: TreeNode;
  level?: number;
  onNavigate?: () => void;
}

export interface TreeViewProps {
  onNavigate?: () => void;
  showRentals: boolean;
  showDesignSystem: boolean;
  showProperties: boolean;
  showTenants: boolean;
  showBarriers: boolean;
  showTurnover: boolean;
  showBuildings: boolean;
  showApartments: boolean;
}
