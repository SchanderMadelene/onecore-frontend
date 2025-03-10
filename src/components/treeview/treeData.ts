
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
