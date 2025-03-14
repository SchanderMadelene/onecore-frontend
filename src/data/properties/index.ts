
import { PropertyDetail } from "@/types/api";
import { property1 } from "./property1";
import { property2 } from "./property2";
import { property3 } from "./property3";

// Property details mock data
export const mockPropertyDetails: Record<string, PropertyDetail> = {
  "vasteras/lundby/odenplan-5": property1,
  "vasteras/backby/gotgatan-15": property2,
  "vasteras/domkyrkan/sveavagen-10": property3
};

// Debug information for available property keys
console.log("Available property keys:", Object.keys(mockPropertyDetails));
