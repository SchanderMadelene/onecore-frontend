
import { TreeNode } from "../types";

export const navigationNodes: TreeNode[] = [
  {
    id: "tenants",
    label: "Kunder",
    icon: "contact",
    path: "/tenants/all",
  },
  {
    id: "lease-contracts",
    label: "Hyreskontrakt",
    icon: "file-text",
    path: "/lease-contracts",
  },
  {
    id: "rentals",
    label: "Uthyrning",
    icon: "key",
    path: "/rentals",
    children: [
      {
        id: "rentals-bostad",
        label: "Bostad",
        icon: "home",
        path: "/rentals/housing",
        children: [
          {
            id: "rentals-bostad-poangfritt",
            label: "Poängfritt",
            icon: "sparkles",
            path: "/rentals/housing/poangfritt",
          },
        ],
      },
      { id: "rentals-bilplats", label: "Bilplats", icon: "car", path: "/rentals/parking" },
      { id: "rentals-forrad", label: "Förråd", icon: "archive", path: "/rentals/storage" },
    ],
  },
  {
    id: "barriers",
    label: "Spärrar",
    icon: "shield-x",
    path: "/barriers",
  },
  {
    id: "turnover",
    label: "Ut- & inflytt",
    icon: "arrow-right-left",
    path: "/turnover",
  },
  {
    id: "inspections",
    label: "Besiktningar",
    icon: "clipboard-list",
    path: "/inspections",
  },
  {
    id: "favorites",
    label: "Favoriter",
    icon: "star",
    path: "/favorites",
  },
  {
    id: "property-areas",
    label: "Förvaltningsområden",
    icon: "map-pin",
    path: "/property-areas",
  },
  {
    id: "design-system",
    label: "Design System",
    icon: "palette",
    path: "/design-system",
  }
];
