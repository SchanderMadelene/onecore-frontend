
import { TreeNode } from "../../types";
import { algen1Property } from "./algen1";
import { lindaren2Property } from "./lindaren2";
import { bjornen4Property } from "./bjornen4";
import { otherProperties } from "./otherProperties";

export const propertiesNode: TreeNode = {
  id: "properties",
  label: "Fastigheter",
  icon: "building",
  path: "/properties",
  children: [
    algen1Property,
    lindaren2Property,
    bjornen4Property,
    ...otherProperties
  ]
};
