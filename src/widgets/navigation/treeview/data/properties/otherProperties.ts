
import { TreeNode } from "../../types";

export const otherProperties: TreeNode[] = [
  {
    id: "pipan-1",
    label: "Pipan 1",
    icon: "building2",
    path: "/properties/pipan-1",
    area: "Pettersberg",
    children: [
      {
        id: "flerfamiljshus-pipan",
        label: "Flerfamiljshus",
        icon: "hotel",
        path: "/properties/pipan-1/flerfamiljshus-pipan",
        children: [
          {
            id: "uppgang-a-pipan",
            label: "Uppgång A",
            icon: "home",
            path: "/properties/pipan-1/flerfamiljshus-pipan/uppgang-a",
            children: [
              {
                id: "lgh-4001",
                label: "4001",
                icon: "door-open",
                path: "/properties/pipan-1/flerfamiljshus-pipan/lgh-4001"
              },
              {
                id: "lgh-4002",
                label: "4002",
                icon: "door-open",
                path: "/properties/pipan-1/flerfamiljshus-pipan/lgh-4002"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "oskaria-1",
    label: "Oskaria 1",
    icon: "building2",
    path: "/properties/oskaria-1",
    area: "Oxbacken",
    children: [
      {
        id: "kontorsbyggnad-oskaria",
        label: "Kontorsbyggnad",
        icon: "hotel",
        path: "/properties/oskaria-1/kontorsbyggnad-oskaria",
        children: [
          {
            id: "uppgang-a-oskaria",
            label: "Uppgång A",
            icon: "home",
            path: "/properties/oskaria-1/kontorsbyggnad-oskaria/uppgang-a",
            children: [
              {
                id: "kontor-201",
                label: "201",
                icon: "door-open",
                path: "/properties/oskaria-1/kontorsbyggnad-oskaria/kontor-201"
              },
              {
                id: "kontor-202",
                label: "202",
                icon: "door-open",
                path: "/properties/oskaria-1/kontorsbyggnad-oskaria/kontor-202"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "styrhylsan-9",
    label: "Styrhylsan 9",
    icon: "building2",
    path: "/properties/styrhylsan-9",
    area: "Hammarby",
    children: [
      {
        id: "radhus-styrhylsan",
        label: "Radhus",
        icon: "hotel",
        path: "/properties/styrhylsan-9/radhus-styrhylsan",
        children: [
          {
            id: "uppgang-a-styrhylsan",
            label: "Uppgång A",
            icon: "home",
            path: "/properties/styrhylsan-9/radhus-styrhylsan/uppgang-a",
            children: [
              {
                id: "lgh-5001",
                label: "5001",
                icon: "door-open",
                path: "/properties/styrhylsan-9/radhus-styrhylsan/lgh-5001"
              },
              {
                id: "lgh-5002",
                label: "5002",
                icon: "door-open",
                path: "/properties/styrhylsan-9/radhus-styrhylsan/lgh-5002"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "bavern-1",
    label: "Bävern 1",
    icon: "building2",
    path: "/properties/bavern-1",
    area: "Centrum",
    children: [
      {
        id: "kontorskomplex-bavern",
        label: "Kontorskomplex",
        icon: "hotel",
        path: "/properties/bavern-1/kontorskomplex-bavern",
        children: [
          {
            id: "uppgang-a-bavern",
            label: "Uppgång A",
            icon: "home",
            path: "/properties/bavern-1/kontorskomplex-bavern/uppgang-a",
            children: [
              {
                id: "kontor-301",
                label: "301",
                icon: "door-open",
                path: "/properties/bavern-1/kontorskomplex-bavern/kontor-301"
              },
              {
                id: "kontor-302",
                label: "302",
                icon: "door-open",
                path: "/properties/bavern-1/kontorskomplex-bavern/kontor-302"
              }
            ]
          }
        ]
      }
    ]
  }
];
