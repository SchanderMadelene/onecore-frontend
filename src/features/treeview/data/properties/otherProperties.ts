
import { TreeNode } from "../../types";

export const otherProperties: TreeNode[] = [
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
];
