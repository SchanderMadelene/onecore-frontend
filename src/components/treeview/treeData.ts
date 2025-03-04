
import { TreeNode } from "./types";

export const treeData: TreeNode[] = [
  {
    id: "vasteras",
    label: "Västerås",
    icon: "location",
    children: [
      {
        id: "lundby",
        label: "Lundby",
        icon: "map",
        children: [
          {
            id: "odenplan-5",
            label: "Odenplan 5",
            icon: "building",
            path: "/properties/vasteras/lundby/odenplan-5",
          },
        ],
      },
      {
        id: "domkyrkan",
        label: "Domkyrkan",
        icon: "map",
        children: [
          {
            id: "sveavagen-10",
            label: "Sveavägen 10",
            icon: "building",
            path: "/properties/vasteras/domkyrkan/sveavagen-10",
          },
        ],
      },
      {
        id: "backby",
        label: "Bäckby",
        icon: "map",
        children: [
          {
            id: "gotgatan-15",
            label: "Götgatan 15",
            icon: "building",
            path: "/properties/vasteras/backby/gotgatan-15",
          },
        ],
      },
    ],
  },
  {
    id: "design-system",
    label: "Design System",
    icon: "palette",
    path: "/design-system",
  }
];
