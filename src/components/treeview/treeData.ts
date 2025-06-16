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
        path: "/properties/vasteras/lundby/algen-1",
        area: "Lundby",
        children: [
          {
            id: "building-a",
            label: "Bellmansgatan 1A - 2C",
            icon: "building",
            path: "/properties/vasteras/lundby/algen-1/bellmansgatan-1a-2c",
            children: [
              {
                id: "lgh-1001",
                label: "LGH-1001",
                icon: "home",
                path: "/properties/vasteras/lundby/algen-1/bellmansgatan-1a-2c/lgh-1001"
              },
              {
                id: "lgh-1002",
                label: "LGH-1002",
                icon: "home",
                path: "/properties/vasteras/lundby/algen-1/bellmansgatan-1a-2c/lgh-1002"
              },
              {
                id: "lgh-1003",
                label: "LGH-1003",
                icon: "home",
                path: "/properties/vasteras/lundby/algen-1/bellmansgatan-1a-2c/lgh-1003"
              }
            ]
          },
          {
            id: "building-b",
            label: "Byggnad B",
            icon: "building",
            path: "/properties/vasteras/lundby/algen-1/byggnad-b",
            children: [
              {
                id: "lgh-2001",
                label: "LGH-2001",
                icon: "home",
                path: "/properties/vasteras/lundby/algen-1/byggnad-b/lgh-2001"
              },
              {
                id: "lgh-2002",
                label: "LGH-2002",
                icon: "home",
                path: "/properties/vasteras/lundby/algen-1/byggnad-b/lgh-2002"
              }
            ]
          }
        ]
      },
      {
        id: "gotgatan-15",
        label: "Lindaren 2",
        icon: "building",
        path: "/properties/vasteras/backby/lindaren-2",
        area: "Bäckby",
        children: [
          {
            id: "hus-a-lindaren",
            label: "Byggnad A",
            icon: "building",
            path: "/properties/vasteras/backby/lindaren-2/byggnad-a",
            children: [
              {
                id: "lgh-3001",
                label: "3001",
                icon: "home",
                path: "/properties/vasteras/backby/lindaren-2/byggnad-a/lgh-3001"
              },
              {
                id: "lgh-3002",
                label: "3002",
                icon: "home",
                path: "/properties/vasteras/backby/lindaren-2/byggnad-a/lgh-3002"
              },
              {
                id: "lgh-3003",
                label: "3003",
                icon: "home",
                path: "/properties/vasteras/backby/lindaren-2/byggnad-a/lgh-3003"
              }
            ]
          }
        ]
      },
      {
        id: "sveavagen-10",
        label: "Björnen 4",
        icon: "building",
        path: "/properties/vasteras/domkyrkan/bjornen-4",
        area: "Domkyrkan",
        children: [
          {
            id: "kontorsbyggnad-a",
            label: "Kontorsbyggnad A",
            icon: "building",
            path: "/properties/vasteras/domkyrkan/bjornen-4/kontorsbyggnad-a",
            children: [
              {
                id: "kontor-101",
                label: "101",
                icon: "home",
                path: "/properties/vasteras/domkyrkan/bjornen-4/kontorsbyggnad-a/kontor-101"
              },
              {
                id: "kontor-102",
                label: "102",
                icon: "home",
                path: "/properties/vasteras/domkyrkan/bjornen-4/kontorsbyggnad-a/kontor-102"
              }
            ]
          },
          {
            id: "kontorsbyggnad-b",
            label: "Kontorsbyggnad B",
            icon: "building",
            path: "/properties/vasteras/domkyrkan/bjornen-4/kontorsbyggnad-b"
          }
        ]
      },
      {
        id: "pipan-1",
        label: "Pipan 1",
        icon: "building",
        path: "/properties/vasteras/pettersberg/pipan-1",
        area: "Pettersberg",
        children: [
          {
            id: "flerfamiljshus-pipan",
            label: "Flerfamiljshus",
            icon: "building",
            path: "/properties/vasteras/pettersberg/pipan-1/flerfamiljshus",
            children: [
              {
                id: "lgh-4001",
                label: "4001",
                icon: "home",
                path: "/properties/vasteras/pettersberg/pipan-1/flerfamiljshus/lgh-4001"
              },
              {
                id: "lgh-4002",
                label: "4002",
                icon: "home",
                path: "/properties/vasteras/pettersberg/pipan-1/flerfamiljshus/lgh-4002"
              }
            ]
          }
        ]
      },
      {
        id: "oskaria-1",
        label: "Oskaria 1",
        icon: "building",
        path: "/properties/vasteras/oxbacken/oskaria-1",
        area: "Oxbacken",
        children: [
          {
            id: "kontorsbyggnad-oskaria",
            label: "Kontorsbyggnad",
            icon: "building",
            path: "/properties/vasteras/oxbacken/oskaria-1/kontorsbyggnad",
            children: [
              {
                id: "kontor-201",
                label: "201",
                icon: "home",
                path: "/properties/vasteras/oxbacken/oskaria-1/kontorsbyggnad/kontor-201"
              },
              {
                id: "kontor-202",
                label: "202",
                icon: "home",
                path: "/properties/vasteras/oxbacken/oskaria-1/kontorsbyggnad/kontor-202"
              }
            ]
          }
        ]
      },
      {
        id: "styrhylsan-9",
        label: "Styrhylsan 9",
        icon: "building",
        path: "/properties/vasteras/hammarby/styrhylsan-9",
        area: "Hammarby",
        children: [
          {
            id: "radhus-styrhylsan",
            label: "Radhus",
            icon: "building",
            path: "/properties/vasteras/hammarby/styrhylsan-9/radhus",
            children: [
              {
                id: "lgh-5001",
                label: "5001",
                icon: "home",
                path: "/properties/vasteras/hammarby/styrhylsan-9/radhus/lgh-5001"
              },
              {
                id: "lgh-5002",
                label: "5002",
                icon: "home",
                path: "/properties/vasteras/hammarby/styrhylsan-9/radhus/lgh-5002"
              }
            ]
          }
        ]
      },
      {
        id: "bavern-1",
        label: "Bävern 1",
        icon: "building",
        path: "/properties/vasteras/centrum/bavern-1",
        area: "Centrum",
        children: [
          {
            id: "kontorskomplex-bavern",
            label: "Kontorskomplex",
            icon: "building",
            path: "/properties/vasteras/centrum/bavern-1/kontorskomplex",
            children: [
              {
                id: "kontor-301",
                label: "301",
                icon: "home",
                path: "/properties/vasteras/centrum/bavern-1/kontorskomplex/kontor-301"
              },
              {
                id: "kontor-302",
                label: "302",
                icon: "home",
                path: "/properties/vasteras/centrum/bavern-1/kontorskomplex/kontor-302"
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
