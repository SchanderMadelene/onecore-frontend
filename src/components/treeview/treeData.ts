import { TreeNode } from "./types";

export const treeData: TreeNode[] = [
  {
    id: "properties",
    label: "Fastigheter",
    icon: "location",
    path: "/properties",
    children: [
      {
        id: "bellmansgatan-1a-2c",
        label: "Älgen 1",
        icon: "building",
        path: "/properties/bellmansgatan-1a-2c",
        area: "Lundby",
        children: [
          {
            id: "building-a",
            label: "Bellmansgatan 1A - 2C",
            icon: "building",
            path: "/properties/bellmansgatan-1a-2c/building-a",
            children: [
              {
                id: "lgh-001",
                label: "LGH-001",
                icon: "home",
                path: "/properties/bellmansgatan-1a-2c/building-a/lgh-001"
              },
              {
                id: "lgh-002",
                label: "LGH-002",
                icon: "home",
                path: "/properties/bellmansgatan-1a-2c/building-a/lgh-002"
              },
              {
                id: "lgh-003",
                label: "LGH-003",
                icon: "home",
                path: "/properties/bellmansgatan-1a-2c/building-a/lgh-003"
              },
              {
                id: "lgh-004",
                label: "LGH-004",
                icon: "home",
                path: "/properties/bellmansgatan-1a-2c/building-a/lgh-004"
              },
              {
                id: "lgh-005",
                label: "LGH-005",
                icon: "home",
                path: "/properties/bellmansgatan-1a-2c/building-a/lgh-005"
              },
              {
                id: "lgh-006",
                label: "LGH-006",
                icon: "home",
                path: "/properties/bellmansgatan-1a-2c/building-a/lgh-006"
              },
              {
                id: "lgh-007",
                label: "LGH-007",
                icon: "home",
                path: "/properties/bellmansgatan-1a-2c/building-a/lgh-007"
              },
              {
                id: "lgh-008",
                label: "LGH-008",
                icon: "home",
                path: "/properties/bellmansgatan-1a-2c/building-a/lgh-008"
              },
              {
                id: "lgh-009",
                label: "LGH-009",
                icon: "home",
                path: "/properties/bellmansgatan-1a-2c/building-a/lgh-009"
              }
            ]
          },
          {
            id: "building-b",
            label: "Byggnad B",
            icon: "building",
            path: "/properties/bellmansgatan-1a-2c/building-b",
            children: [
              {
                id: "lgh-2001",
                label: "LGH-2001",
                icon: "home",
                path: "/properties/bellmansgatan-1a-2c/building-b/lgh-2001"
              },
              {
                id: "lgh-2002",
                label: "LGH-2002",
                icon: "home",
                path: "/properties/bellmansgatan-1a-2c/building-b/lgh-2002"
              }
            ]
          }
        ]
      },
      {
        id: "gotgatan-15",
        label: "Lindaren 2",
        icon: "building",
        path: "/properties/gotgatan-15",
        area: "Bäckby",
        children: [
          {
            id: "hus-a-lindaren",
            label: "Byggnad A",
            icon: "building",
            path: "/properties/gotgatan-15/hus-a-lindaren",
            children: [
              {
                id: "lgh-3001",
                label: "3001",
                icon: "home",
                path: "/properties/gotgatan-15/hus-a-lindaren/lgh-3001"
              },
              {
                id: "lgh-3002",
                label: "3002",
                icon: "home",
                path: "/properties/gotgatan-15/hus-a-lindaren/lgh-3002"
              },
              {
                id: "lgh-3003",
                label: "3003",
                icon: "home",
                path: "/properties/gotgatan-15/hus-a-lindaren/lgh-3003"
              }
            ]
          }
        ]
      },
      {
        id: "sveavagen-10",
        label: "Björnen 4",
        icon: "building",
        path: "/properties/sveavagen-10",
        area: "Domkyrkan",
        children: [
          {
            id: "kontorsbyggnad-a",
            label: "Kontorsbyggnad A",
            icon: "building",
            path: "/properties/sveavagen-10/kontorsbyggnad-a",
            children: [
              {
                id: "kontor-101",
                label: "101",
                icon: "home",
                path: "/properties/sveavagen-10/kontorsbyggnad-a/kontor-101"
              },
              {
                id: "kontor-102",
                label: "102",
                icon: "home",
                path: "/properties/sveavagen-10/kontorsbyggnad-a/kontor-102"
              }
            ]
          },
          {
            id: "kontorsbyggnad-b",
            label: "Kontorsbyggnad B",
            icon: "building",
            path: "/properties/sveavagen-10/kontorsbyggnad-b"
          }
        ]
      },
      {
        id: "pipan-1",
        label: "Pipan 1",
        icon: "building",
        path: "/properties/pipan-1",
        area: "Pettersberg",
        children: [
          {
            id: "flerfamiljshus-pipan",
            label: "Flerfamiljshus",
            icon: "building",
            path: "/properties/pipan-1/flerfamiljshus-pipan",
            children: [
              {
                id: "lgh-4001",
                label: "4001",
                icon: "home",
                path: "/properties/pipan-1/flerfamiljshus-pipan/lgh-4001"
              },
              {
                id: "lgh-4002",
                label: "4002",
                icon: "home",
                path: "/properties/pipan-1/flerfamiljshus-pipan/lgh-4002"
              }
            ]
          }
        ]
      },
      {
        id: "oskaria-1",
        label: "Oskaria 1",
        icon: "building",
        path: "/properties/oskaria-1",
        area: "Oxbacken",
        children: [
          {
            id: "kontorsbyggnad-oskaria",
            label: "Kontorsbyggnad",
            icon: "building",
            path: "/properties/oskaria-1/kontorsbyggnad-oskaria",
            children: [
              {
                id: "kontor-201",
                label: "201",
                icon: "home",
                path: "/properties/oskaria-1/kontorsbyggnad-oskaria/kontor-201"
              },
              {
                id: "kontor-202",
                label: "202",
                icon: "home",
                path: "/properties/oskaria-1/kontorsbyggnad-oskaria/kontor-202"
              }
            ]
          }
        ]
      },
      {
        id: "styrhylsan-9",
        label: "Styrhylsan 9",
        icon: "building",
        path: "/properties/styrhylsan-9",
        area: "Hammarby",
        children: [
          {
            id: "radhus-styrhylsan",
            label: "Radhus",
            icon: "building",
            path: "/properties/styrhylsan-9/radhus-styrhylsan",
            children: [
              {
                id: "lgh-5001",
                label: "5001",
                icon: "home",
                path: "/properties/styrhylsan-9/radhus-styrhylsan/lgh-5001"
              },
              {
                id: "lgh-5002",
                label: "5002",
                icon: "home",
                path: "/properties/styrhylsan-9/radhus-styrhylsan/lgh-5002"
              }
            ]
          }
        ]
      },
      {
        id: "bavern-1",
        label: "Bävern 1",
        icon: "building",
        path: "/properties/bavern-1",
        area: "Centrum",
        children: [
          {
            id: "kontorskomplex-bavern",
            label: "Kontorskomplex",
            icon: "building",
            path: "/properties/bavern-1/kontorskomplex-bavern",
            children: [
              {
                id: "kontor-301",
                label: "301",
                icon: "home",
                path: "/properties/bavern-1/kontorskomplex-bavern/kontor-301"
              },
              {
                id: "kontor-302",
                label: "302",
                icon: "home",
                path: "/properties/bavern-1/kontorskomplex-bavern/kontor-302"
              }
            ]
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
    id: "rentals",
    label: "Uthyrning",
    icon: "key",
    path: "/rentals",
  },
  {
    id: "design-system",
    label: "Design System",
    icon: "palette",
    path: "/design-system",
  }
];
