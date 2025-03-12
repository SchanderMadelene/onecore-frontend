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
            id: "building-a",
            label: "Hus A",
            icon: "building",
            path: "/properties/vasteras/lundby/odenplan-5/building-a",
            children: [
              {
                id: "lgh-1001",
                label: "LGH-1001",
                icon: "home",
                path: "/properties/vasteras/lundby/odenplan-5/building-a/lgh-1001"
              },
              {
                id: "lgh-1002",
                label: "LGH-1002",
                icon: "home",
                path: "/properties/vasteras/lundby/odenplan-5/building-a/lgh-1002"
              },
              {
                id: "lgh-1003",
                label: "LGH-1003",
                icon: "home",
                path: "/properties/vasteras/lundby/odenplan-5/building-a/lgh-1003"
              }
            ]
          },
          {
            id: "building-b",
            label: "Hus B",
            icon: "building",
            path: "/properties/vasteras/lundby/odenplan-5/building-b",
            children: [
              {
                id: "lgh-2001",
                label: "LGH-2001",
                icon: "home",
                path: "/properties/vasteras/lundby/odenplan-5/building-b/lgh-2001"
              },
              {
                id: "lgh-2002",
                label: "LGH-2002",
                icon: "home",
                path: "/properties/vasteras/lundby/odenplan-5/building-b/lgh-2002"
              }
            ]
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
