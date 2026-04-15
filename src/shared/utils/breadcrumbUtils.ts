
import { treeData } from "@/widgets/navigation/treeview/treeData";
import type { TreeNode } from "@/widgets/navigation/treeview/types";

export interface BreadcrumbItem {
  label: string;
  path: string;
}

const propertyMappings: Record<string, string> = {
  "odenplan-5": "Älgen 1",
  "gotgatan-15": "Lindaren 2",
  "sveavagen-10": "Björnen 4",
  "pipan-1": "Pipan 1",
  "oskaria-1": "Oskaria 1",
  "styrhylsan-9": "Styrhylsan 9",
  "bavern-1": "Bävern 1",
};

const buildingMappings: Record<string, string> = {
  "building-a": "Bellmansgatan 1A - 2C",
  "building-b": "Byggnad B",
  "hus-a-lindaren": "Byggnad A",
  "kontorsbyggnad-a": "Kontorsbyggnad A",
  "kontorsbyggnad-b": "Kontorsbyggnad B",
  "flerfamiljshus-pipan": "Flerfamiljshus",
  "kontorsbyggnad-oskaria": "Kontorsbyggnad",
  "radhus-styrhylsan": "Radhus",
  "kontorskomplex-bavern": "Kontorskomplex",
};

const residenceMappings: Record<string, string> = {
  "lgh-1001": "LGH-1001",
  "lgh-1002": "LGH-1002",
  "lgh-1003": "LGH-1003",
  "lgh-2001": "LGH-2001",
  "lgh-2002": "LGH-2002",
  "lgh-3001": "3001",
  "lgh-3002": "3002",
  "lgh-3003": "3003",
  "kontor-101": "101",
  "kontor-102": "102",
  "kontor-201": "201",
  "kontor-202": "202",
  "lgh-4001": "4001",
  "lgh-4002": "4002",
  "lgh-5001": "5001",
  "lgh-5002": "5002",
  "kontor-301": "301",
  "kontor-302": "302",
};

export const getBreadcrumbLabel = (segment: string, type: 'property' | 'building' | 'residence'): string => {
  if (type === 'property') return propertyMappings[segment] || segment;
  if (type === 'building') return buildingMappings[segment] || segment;
  return residenceMappings[segment] || segment;
};

/** Top-level route labels */
const routeLabels: Record<string, string> = {
  properties: "Fastigheter",
  tenants: "Kunder",
  rentals: "Uthyrning",
  barriers: "Spärrar",
  turnover: "Ut- & inflytt",
  inspections: "Besiktningar",
  favorites: "Favoriter",
  settings: "Inställningar",
  "design-system": "Designsystem",
  "lease-contracts": "Hyreskontrakt",
  strofaktura: "Ströfaktura",
  "property-areas": "Förvaltningsområden",
};

/** Sub-route labels for specific sections */
const subRouteLabels: Record<string, Record<string, string>> = {
  tenants: { all: "Alla kunder", detail: "Kunddetalj" },
  rentals: {
    "create-housing-ad": "Skapa annons",
    parking: "Bilplats",
    housing: "Bostad",
    "residence-profile": "Boendeprofil",
  },
  "property-areas": { admin: "Administration" },
};

export const generateBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return [];

  const root = segments[0];
  const breadcrumbs: BreadcrumbItem[] = [];

  // Root label
  const rootLabel = routeLabels[root];
  if (!rootLabel) return [];

  breadcrumbs.push({ label: rootLabel, path: `/${root}` });

  // Properties have special deep hierarchy
  if (root === "properties") {
    const propertySegment = segments[1];
    const buildingSegment = segments[2];
    const residenceSegment = segments[3];

    if (propertySegment) {
      const propertyPath = `/properties/${propertySegment}`;
      breadcrumbs.push({
        label: getBreadcrumbLabel(propertySegment, 'property'),
        path: propertyPath,
      });

      if (buildingSegment) {
        const buildingPath = `${propertyPath}/${buildingSegment}`;
        breadcrumbs.push({
          label: getBreadcrumbLabel(buildingSegment, 'building'),
          path: buildingPath,
        });

        if (residenceSegment) {
          // Check if this residence lives under an entrance in the tree
          const entrance = findEntranceParent(propertySegment, buildingSegment, residenceSegment);
          if (entrance) {
            breadcrumbs.push({
              label: entrance.label,
              path: entrance.path || buildingPath,
            });
          }

          breadcrumbs.push({
            label: getBreadcrumbLabel(residenceSegment, 'residence'),
            path: `${buildingPath}/${residenceSegment}`,
          });
        }
      }
    }
    return breadcrumbs;
  }

  // Generic sub-routes
  for (let i = 1; i < segments.length; i++) {
    const seg = segments[i];
    const path = '/' + segments.slice(0, i + 1).join('/');
    const subs = subRouteLabels[root];
    const label = subs?.[seg];
    if (label) {
      breadcrumbs.push({ label, path });
    }
  }

  return breadcrumbs;
};
