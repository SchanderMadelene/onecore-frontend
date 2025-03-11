import { TreeNode } from "../components/treeview/types";

export interface SearchResult {
  id: string;
  name: string;
  type: "property" | "building" | "apartment" | "tenant";
  address: string;
  path: string;
  tenant?: {
    name: string;
    active: boolean;
  };
}

const propertyResults: SearchResult[] = [
  {
    id: "lgh-101",
    name: "Lägenhet 1001",
    type: "apartment",
    address: "Älgen 1, Lundby",
    path: "/properties/vasteras/lundby/odenplan-5/lgh-101",
    tenant: {
      name: "Anna Andersson",
      active: true
    }
  },
  {
    id: "lgh-201",
    name: "Lägenhet 1002",
    type: "apartment",
    address: "Älgen 1, Lundby",
    path: "/properties/vasteras/lundby/odenplan-5/lgh-201",
    tenant: {
      name: "Johan Svensson",
      active: true
    }
  },
  {
    id: "lgh-301",
    name: "Lägenhet 2001",
    type: "apartment",
    address: "Älgen 1, Lundby",
    path: "/properties/vasteras/lundby/odenplan-5/lgh-301",
    tenant: {
      name: "Maria Eriksson",
      active: true
    }
  },
  {
    id: "lgh-301",
    name: "Lägenhet 3001",
    type: "apartment",
    address: "Lindaren 2, Bäckby",
    path: "/properties/vasteras/backby/gotgatan-15/lgh-301",
    tenant: {
      name: "Henrik Johansson",
      active: true
    }
  },
  {
    id: "lgh-302",
    name: "Lägenhet 3002",
    type: "apartment",
    address: "Lindaren 2, Bäckby",
    path: "/properties/vasteras/backby/gotgatan-15/lgh-302"
  },
  {
    id: "lgh-101",
    name: "Kontor 101",
    type: "apartment",
    address: "Björnen 4, Domkyrkan",
    path: "/properties/vasteras/domkyrkan/sveavagen-10/lgh-101",
    tenant: {
      name: "Tech AB",
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

// Combine all search results into a single exported array
export const mockSearchResults: SearchResult[] = [
  ...propertyResults,
  ...tenantResults
];
