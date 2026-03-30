
import { TreeNode } from "../../types";

export const lindaren2Property: TreeNode = {
  id: "lindaren-2",
  label: "Lindaren 2",
  icon: "building",
  path: "/properties/lindaren-2",
  area: "Bäckby",
  children: [
    {
      id: "hus-a-lindaren",
      label: "Byggnad A",
      icon: "building",
      path: "/properties/lindaren-2/hus-a-lindaren",
      children: [
        {
          id: "uppgang-a-lindaren",
          label: "Uppgång A",
          icon: "door-open",
          path: "/properties/lindaren-2/hus-a-lindaren/uppgang-a",
          children: [
            {
              id: "lgh-3001",
              label: "3001",
              icon: "home",
              path: "/properties/lindaren-2/hus-a-lindaren/lgh-3001"
            },
            {
              id: "lgh-3002",
              label: "3002",
              icon: "home",
              path: "/properties/lindaren-2/hus-a-lindaren/lgh-3002"
            },
            {
              id: "lgh-3003",
              label: "3003",
              icon: "home",
              path: "/properties/lindaren-2/hus-a-lindaren/lgh-3003"
            }
          ]
        }
      ]
    }
  ]
};
