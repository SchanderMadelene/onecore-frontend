
import { TreeNode } from "./types";

export const treeData: TreeNode[] = [
  {
    id: "fastigheter",
    label: "Fastigheter",
    icon: "🏛",
    children: [
      {
        id: "lundby",
        label: "Lundby",
        icon: "📍",
        children: [
          {
            id: "odenplan-5",
            label: "Odenplan 5",
            icon: "🏢",
            path: "/properties/vasteras/lundby/odenplan-5",
            children: [
              {
                id: "building-a",
                label: "Huvudbyggnad",
                icon: "🏗",
                children: [
                  {
                    id: "entrance-1",
                    label: "Trapphus A",
                    icon: "🏠",
                    children: [
                      {
                        id: "apt-1001",
                        label: "Lägenhet 1001",
                        icon: "🚪",
                        path: "/properties/vasteras/lundby/odenplan-5/1001"
                      },
                      {
                        id: "apt-1002",
                        label: "Lägenhet 1002",
                        icon: "🚪",
                        path: "/properties/vasteras/lundby/odenplan-5/1002"
                      }
                    ]
                  },
                  {
                    id: "entrance-2",
                    label: "Trapphus B",
                    icon: "🏠",
                    children: [
                      {
                        id: "apt-2001",
                        label: "Lägenhet 2001",
                        icon: "🚪",
                        path: "/properties/vasteras/lundby/odenplan-5/2001"
                      },
                      {
                        id: "apt-2002",
                        label: "Lägenhet 2002",
                        icon: "🚪",
                        path: "/properties/vasteras/lundby/odenplan-5/2002"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "domkyrkan",
        label: "Domkyrkan",
        icon: "📍",
        children: [
          {
            id: "sveavagen-10",
            label: "Sveavägen 10",
            icon: "🏢",
            path: "/properties/vasteras/domkyrkan/sveavagen-10",
            children: [
              {
                id: "building-b",
                label: "Kontorsbyggnad",
                icon: "🏗",
                children: [
                  {
                    id: "entrance-3",
                    label: "Entré Syd",
                    icon: "🏠",
                    children: [
                      {
                        id: "office-101",
                        label: "Kontor 101",
                        icon: "🚪",
                        path: "/properties/vasteras/domkyrkan/sveavagen-10/101"
                      },
                      {
                        id: "office-102",
                        label: "Kontor 102",
                        icon: "🚪",
                        path: "/properties/vasteras/domkyrkan/sveavagen-10/102"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "backby",
        label: "Bäckby",
        icon: "📍",
        children: [
          {
            id: "gotgatan-15",
            label: "Götgatan 15",
            icon: "🏢",
            path: "/properties/vasteras/backby/gotgatan-15",
            children: [
              {
                id: "building-c",
                label: "Bostadshus",
                icon: "🏗",
                children: [
                  {
                    id: "entrance-4",
                    label: "Trapphus 1",
                    icon: "🏠",
                    children: [
                      {
                        id: "apt-3001",
                        label: "Lägenhet 3001",
                        icon: "🚪",
                        path: "/properties/vasteras/backby/gotgatan-15/3001"
                      },
                      {
                        id: "apt-3002",
                        label: "Lägenhet 3002",
                        icon: "🚪",
                        path: "/properties/vasteras/backby/gotgatan-15/3002"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];
