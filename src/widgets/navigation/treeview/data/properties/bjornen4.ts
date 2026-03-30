
import { TreeNode } from "../../types";

export const bjornen4Property: TreeNode = {
  id: "bjornen-4",
  label: "Björnen 4",
  icon: "building2",
  path: "/properties/bjornen-4",
  area: "Domkyrkan",
  children: [
    {
      id: "kontorsbyggnad-a",
      label: "Kontorsbyggnad A",
      icon: "hotel",
      path: "/properties/bjornen-4/kontorsbyggnad-a",
      children: [
        {
          id: "uppgang-a-bjornen",
          label: "Uppgång A",
          icon: "home",
          path: "/properties/bjornen-4/kontorsbyggnad-a/uppgang-a",
          children: [
            {
              id: "kontor-101",
              label: "101",
              icon: "door-open",
              path: "/properties/bjornen-4/kontorsbyggnad-a/kontor-101"
            },
            {
              id: "kontor-102",
              label: "102",
              icon: "door-open",
              path: "/properties/bjornen-4/kontorsbyggnad-a/kontor-102"
            }
          ]
        }
      ]
    },
    {
      id: "kontorsbyggnad-b",
      label: "Kontorsbyggnad B",
      icon: "hotel",
      path: "/properties/bjornen-4/kontorsbyggnad-b"
    }
  ]
};
