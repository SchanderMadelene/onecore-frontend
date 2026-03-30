
import { TreeNode } from "../../types";

export const algen1Property: TreeNode = {
  id: "algen-1",
  label: "Älgen 1",
  icon: "building2",
  path: "/properties/algen-1",
  area: "Lundby",
  children: [
    {
      id: "bellmansgatan-1a-2c",
      label: "Bellmansgatan 1A - 2C",
      icon: "hotel",
      path: "/properties/algen-1/bellmansgatan-1a-2c",
      children: [
        {
          id: "uppgang-1a",
          label: "Uppgång 1A",
          icon: "home",
          path: "/properties/algen-1/bellmansgatan-1a-2c/uppgang-1a",
          children: [
            {
              id: "lgh-001",
              label: "LGH-001",
              icon: "door-open",
              path: "/properties/algen-1/bellmansgatan-1a-2c/lgh-001"
            },
            {
              id: "lgh-002",
              label: "LGH-002",
              icon: "door-open",
              path: "/properties/algen-1/bellmansgatan-1a-2c/lgh-002"
            },
            {
              id: "lgh-003",
              label: "LGH-003",
              icon: "door-open",
              path: "/properties/algen-1/bellmansgatan-1a-2c/lgh-003"
            }
          ]
        },
        {
          id: "uppgang-1b",
          label: "Uppgång 1B",
          icon: "home",
          path: "/properties/algen-1/bellmansgatan-1a-2c/uppgang-1b",
          children: [
            {
              id: "lgh-004",
              label: "LGH-004",
              icon: "door-open",
              path: "/properties/algen-1/bellmansgatan-1a-2c/lgh-004"
            },
            {
              id: "lgh-005",
              label: "LGH-005",
              icon: "door-open",
              path: "/properties/algen-1/bellmansgatan-1a-2c/lgh-005"
            },
            {
              id: "lgh-006",
              label: "LGH-006",
              icon: "door-open",
              path: "/properties/algen-1/bellmansgatan-1a-2c/lgh-006"
            }
          ]
        },
        {
          id: "uppgang-2c",
          label: "Uppgång 2C",
          icon: "home",
          path: "/properties/algen-1/bellmansgatan-1a-2c/uppgang-2c",
          children: [
            {
              id: "lgh-007",
              label: "LGH-007",
              icon: "door-open",
              path: "/properties/algen-1/bellmansgatan-1a-2c/lgh-007"
            },
            {
              id: "lgh-008",
              label: "LGH-008",
              icon: "door-open",
              path: "/properties/algen-1/bellmansgatan-1a-2c/lgh-008"
            },
            {
              id: "lgh-009",
              label: "LGH-009",
              icon: "door-open",
              path: "/properties/algen-1/bellmansgatan-1a-2c/lgh-009"
            }
          ]
        }
      ]
    },
    {
      id: "building-b",
      label: "Byggnad B",
      icon: "hotel",
      path: "/properties/algen-1/building-b",
      children: [
        {
          id: "uppgang-b1",
          label: "Uppgång B1",
          icon: "home",
          path: "/properties/algen-1/building-b/uppgang-b1",
          children: [
            {
              id: "lgh-2001",
              label: "LGH-2001",
              icon: "door-open",
              path: "/properties/algen-1/building-b/lgh-2001"
            },
            {
              id: "lgh-2002",
              label: "LGH-2002",
              icon: "door-open",
              path: "/properties/algen-1/building-b/lgh-2002"
            }
          ]
        }
      ]
    }
  ]
};
