import { TreeNode } from "@/widgets/navigation";

export interface SearchResult {
  id: string;
  name: string;
  type: "property" | "building" | "apartment" | "tenant" | "maintenance" | "buildingpart";
  address: string;
  path: string;
  tenant?: {
    name: string;
    active: boolean;
  };
  // Apartment-specific fields
  size?: number;
  rent?: number;
  hasContract?: boolean;
  contractStatus?: "active" | "expiring" | "expired" | "vacant";
}

const propertyResults: SearchResult[] = [
  {
    id: "lgh-1001",
    name: "Lägenhet 1001",
    type: "apartment",
    address: "Älgen 1, Lundby",
    path: "/properties/vasteras/lundby/odenplan-5/building-a/lgh-1001",
    size: 56,
    rent: 8500,
    hasContract: true,
    contractStatus: "active",
    tenant: {
      name: "Anna Andersson",
      active: true
    }
  },
  {
    id: "lgh-1002",
    name: "Lägenhet 1002",
    type: "apartment",
    address: "Älgen 1, Lundby",
    path: "/properties/vasteras/lundby/odenplan-5/building-a/lgh-1002",
    size: 72,
    rent: 9200,
    hasContract: true,
    contractStatus: "active",
    tenant: {
      name: "Johan Svensson",
      active: true
    }
  },
  {
    id: "lgh-2001",
    name: "Lägenhet 2001",
    type: "apartment",
    address: "Älgen 1, Lundby",
    path: "/properties/vasteras/lundby/odenplan-5/building-b/lgh-2001",
    size: 64,
    rent: 8300,
    hasContract: true,
    contractStatus: "expiring",
    tenant: {
      name: "Maria Eriksson",
      active: true
    }
  },
  {
    id: "lgh-3001",
    name: "Lägenhet 3001",
    type: "apartment",
    address: "Lindaren 2, Bäckby",
    path: "/properties/vasteras/backby/gotgatan-15/hus-a-lindaren/lgh-3001",
    size: 78,
    rent: 9500,
    hasContract: true,
    contractStatus: "active",
    tenant: {
      name: "Henrik Johansson",
      active: true
    }
  },
  {
    id: "lgh-3002",
    name: "Lägenhet 3002",
    type: "apartment",
    address: "Lindaren 2, Bäckby",
    path: "/properties/vasteras/backby/gotgatan-15/hus-a-lindaren/lgh-3002",
    size: 52,
    rent: 8700,
    hasContract: false,
    contractStatus: "vacant"
  },
  {
    id: "kontor-101",
    name: "Kontor 101",
    type: "apartment",
    address: "Björnen 4, Domkyrkan",
    path: "/properties/vasteras/domkyrkan/sveavagen-10/kontorsbyggnad-a/kontor-101",
    size: 95,
    rent: 12000,
    hasContract: true,
    contractStatus: "active",
    tenant: {
      name: "Tech AB",
      active: true
    }
  },
  {
    id: "lgh-4001",
    name: "Lägenhet 4001",
    type: "apartment",
    address: "Pipan 1, Pettersberg",
    path: "/properties/vasteras/pettersberg/pipan-1/flerfamiljshus-pipan/lgh-4001",
    size: 68,
    rent: 8900,
    hasContract: true,
    contractStatus: "active",
    tenant: {
      name: "Peter Pettersson",
      active: true
    }
  },
  {
    id: "lgh-4002",
    name: "Lägenhet 4002",
    type: "apartment",
    address: "Pipan 1, Pettersberg",
    path: "/properties/vasteras/pettersberg/pipan-1/flerfamiljshus-pipan/lgh-4002",
    size: 45,
    rent: 7500,
    hasContract: false,
    contractStatus: "vacant"
  },
  {
    id: "kontor-201",
    name: "Kontor 201",
    type: "apartment",
    address: "Oskaria 1, Oxbacken",
    path: "/properties/vasteras/oxbacken/oskaria-1/kontorsbyggnad-oskaria/kontor-201",
    size: 120,
    rent: 15000,
    hasContract: true,
    contractStatus: "active",
    tenant: {
      name: "Digital Solutions AB",
      active: true
    }
  },
  {
    id: "lgh-5001",
    name: "Lägenhet 5001",
    type: "apartment",
    address: "Styrhylsan 9, Hammarby",
    path: "/properties/vasteras/hammarby/styrhylsan-9/radhus-styrhylsan/lgh-5001",
    size: 88,
    rent: 10200,
    hasContract: true,
    contractStatus: "expired",
    tenant: {
      name: "Stefan Hammarberg",
      active: true
    }
  },
  {
    id: "kontor-301",
    name: "Kontor 301",
    type: "apartment",
    address: "Bävern 1, Centrum",
    path: "/properties/vasteras/centrum/bavern-1/kontorskomplex-bavern/kontor-301",
    size: 75,
    rent: 11500,
    hasContract: true,
    contractStatus: "active",
    tenant: {
      name: "Centrumkliniken AB",
      active: true
    }
  },
  {
    id: "odenplan-5",
    name: "Älgen 1",
    type: "property",
    address: "Lundby, Västerås",
    path: "/properties/vasteras/lundby/odenplan-5"
  },
  {
    id: "sveavagen-10",
    name: "Björnen 4",
    type: "property",
    address: "Domkyrkan, Västerås",
    path: "/properties/vasteras/domkyrkan/sveavagen-10"
  },
  {
    id: "gotgatan-15",
    name: "Lindaren 2",
    type: "property",
    address: "Bäckby, Västerås",
    path: "/properties/vasteras/backby/gotgatan-15"
  },
  {
    id: "pipan-1",
    name: "Pipan 1",
    type: "property",
    address: "Pettersberg, Västerås",
    path: "/properties/vasteras/pettersberg/pipan-1"
  },
  {
    id: "oskaria-1",
    name: "Oskaria 1",
    type: "property",
    address: "Oxbacken, Västerås",
    path: "/properties/vasteras/oxbacken/oskaria-1"
  },
  {
    id: "styrhylsan-9",
    name: "Styrhylsan 9",
    type: "property",
    address: "Hammarby, Västerås",
    path: "/properties/vasteras/hammarby/styrhylsan-9"
  },
  {
    id: "bavern-1",
    name: "Bävern 1",
    type: "property",
    address: "Centrum, Västerås",
    path: "/properties/vasteras/centrum/bavern-1"
  }
];

const tenantResults: SearchResult[] = [
  {
    id: "19850101-1234",
    name: "Anna Andersson",
    type: "tenant",
    address: "Älgen 1, Lundby",
    path: "/tenants/detail/19850101-1234"
  },
  {
    id: "19760315-5678",
    name: "Erik Karlsson",
    type: "tenant",
    address: "Björnen 4, Domkyrkan",
    path: "/tenants/detail/19760315-5678"
  },
  {
    id: "19911122-9012",
    name: "Maria Lindberg",
    type: "tenant",
    address: "Lindaren 2, Bäckby",
    path: "/tenants/detail/19911122-9012"
  },
  {
    id: "5566778899",
    name: "Svenssons Bygg AB",
    type: "tenant",
    address: "Björnen 4, Domkyrkan",
    path: "/tenants/detail/5566778899"
  },
  {
    id: "1122334455",
    name: "Johanssons Fastigheter KB",
    type: "tenant",
    address: "Älgen 1, Lundby",
    path: "/tenants/detail/1122334455"
  }
];

export const mockSearchResults: SearchResult[] = [
  ...propertyResults,
  ...tenantResults
];
