
import { TreeNode } from "./types";

export const treeData: TreeNode[] = [
  {
    id: "properties",
    label: "Fastigheter",
    icon: "location",
    path: "/properties",
    children: [
      {
        id: "odenplan-5",
        label: "Älgen 1",
        icon: "building",
        path: "/properties/vasteras/lundby/odenplan-5",
        area: "Lundby",
        children: [
          {
            id: "lgh-101",
            label: "LGH-101",
            icon: "home",
            path: "/properties/vasteras/lundby/odenplan-5/lgh-101"
          },
          {
            id: "lgh-102",
            label: "LGH-102",
            icon: "home",
            path: "/properties/vasteras/lundby/odenplan-5/lgh-102"
          }
        ]
      },
      {
        id: "sveavagen-10",
        label: "Björnen 4",
        icon: "building",
        path: "/properties/vasteras/domkyrkan/sveavagen-10",
        area: "Domkyrkan",
        children: [
          {
            id: "lgh-201",
            label: "LGH-201",
            icon: "home",
            path: "/properties/vasteras/domkyrkan/sveavagen-10/lgh-201"
          },
          {
            id: "lgh-202",
            label: "LGH-202",
            icon: "home",
            path: "/properties/vasteras/domkyrkan/sveavagen-10/lgh-202"
          }
        ]
      },
      {
        id: "gotgatan-15",
        label: "Lindaren 2",
        icon: "building",
        path: "/properties/vasteras/backby/gotgatan-15",
        area: "Bäckby",
        children: [
          {
            id: "lgh-301",
            label: "LGH-301",
            icon: "home",
            path: "/properties/vasteras/backby/gotgatan-15/lgh-301"
          },
          {
            id: "lgh-302",
            label: "LGH-302",
            icon: "home",
            path: "/properties/vasteras/backby/gotgatan-15/lgh-302"
          }
        ]
      }
    ]
  },
  {
    id: "tenants",
    label: "Kunder",
    icon: "contact",
    path: "/tenants/all",
  },
  {
    id: "design-system",
    label: "Design System",
    icon: "palette",
    path: "/design-system",
  }
];
