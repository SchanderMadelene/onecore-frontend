import { SearchResult } from "@/types/search";

// Expanded mock data for global search
export const mockGlobalSearchResults: SearchResult[] = [
  // Customers
  {
    id: "cust-001",
    type: "customer",
    title: "Anna Andersson",
    subtitle: "19920315-1234",
    description: "anna.andersson@email.com • Storgatan 15, 2tr",
    path: "/tenants/cust-001",
    metadata: { hasActiveCases: true, contractStatus: "active" }
  },
  {
    id: "cust-002", 
    type: "customer",
    title: "Erik Eriksson",
    subtitle: "19850722-5678",
    description: "erik.eriksson@email.com • Parkgatan 8A",
    path: "/tenants/cust-002",
    metadata: { hasActiveCases: false, contractStatus: "active" }
  },
  
  // Residences
  {
    id: "res-001",
    type: "residence", 
    title: "Storgatan 15, 2tr",
    subtitle: "Objekt #33124",
    description: "3 rok, 78 kvm • Hyresgäst: Anna Andersson",
    path: "/residences/res-001",
    metadata: { tenant: "Anna Andersson", rooms: 3, area: "78 kvm", status: "occupied" }
  },
  {
    id: "res-002",
    type: "residence",
    title: "Parkgatan 8A",
    subtitle: "Objekt #33125", 
    description: "2 rok, 56 kvm • Vakant",
    path: "/residences/res-002",
    metadata: { tenant: null, rooms: 2, area: "56 kvm", status: "vacant" }
  },

  // Cases/Orders
  {
    id: "case-001",
    type: "case",
    title: "Serviceanmälan - Kran droppande",
    subtitle: "Ärende #SA-2024-001",
    description: "Storgatan 15, 2tr • Status: Pågående • Anna Andersson",
    path: "/orders/case-001",
    metadata: { status: "ongoing", priority: "medium", address: "Storgatan 15, 2tr" }
  },
  {
    id: "case-002", 
    type: "case",
    title: "Inflytt - Slutbesiktning",
    subtitle: "Ärende #IN-2024-002",
    description: "Parkgatan 8A • Status: Planerad • Ny hyresgäst",
    path: "/orders/case-002", 
    metadata: { status: "planned", priority: "high", address: "Parkgatan 8A" }
  },

  // Invoices
  {
    id: "inv-001",
    type: "invoice",
    title: "Hyresfaktura Januari 2024",
    subtitle: "Faktura #2024-001",
    description: "Anna Andersson • 12,500 kr • Betald",
    path: "/invoices/inv-001",
    metadata: { amount: 12500, status: "paid", customer: "Anna Andersson" }
  },
  {
    id: "inv-002",
    type: "invoice", 
    title: "Reparationsavgift",
    subtitle: "Faktura #2024-045",
    description: "Erik Eriksson • 2,800 kr • Obetald",
    path: "/invoices/inv-002",
    metadata: { amount: 2800, status: "unpaid", customer: "Erik Eriksson" }
  },

  // Keys
  {
    id: "key-001",
    type: "key",
    title: "Huvudnyckel Storgatan 15",
    subtitle: "Nyckel #NK-001",
    description: "Anna Andersson • Utlämnad 2023-03-15 • Aktiv",
    path: "/keys/key-001",
    metadata: { holder: "Anna Andersson", status: "active", issuedDate: "2023-03-15" }
  },
  {
    id: "key-002",
    type: "key",
    title: "Brevlådenyckel Parkgatan 8A", 
    subtitle: "Nyckel #BN-142",
    description: "Ej utlämnad • Tillgänglig",
    path: "/keys/key-002",
    metadata: { holder: null, status: "available", issuedDate: null }
  },

  // Documents
  {
    id: "doc-001",
    type: "document",
    title: "Besiktningsprotokoll",
    subtitle: "Protokoll #BP-2024-001",
    description: "Storgatan 15, 2tr • Inflyttbesiktning • 2024-01-15",
    path: "/documents/doc-001",
    metadata: { documentType: "inspection", address: "Storgatan 15, 2tr", date: "2024-01-15" }
  },
  {
    id: "doc-002",
    type: "document", 
    title: "Hyreskontrakt",
    subtitle: "Kontrakt #HK-2023-089",
    description: "Anna Andersson • Storgatan 15, 2tr • Giltigt till 2025-03-31",
    path: "/documents/doc-002",
    metadata: { documentType: "contract", customer: "Anna Andersson", validUntil: "2025-03-31" }
  }
];

// Mock saved searches
export const mockSavedSearches = [
  {
    id: "fav-001",
    name: "Pågående inflyttar område A",
    query: "inflytt",
    filters: ["case" as const],
    createdAt: new Date("2024-01-15"),
    lastUsed: new Date("2024-01-20"),
    useCount: 15
  },
  {
    id: "fav-002", 
    name: "Vakanta lägenheter",
    query: "vakant",
    filters: ["residence" as const],
    createdAt: new Date("2024-01-10"),
    lastUsed: new Date("2024-01-19"),
    useCount: 8
  },
  {
    id: "fav-003",
    name: "Obetalda fakturor",
    query: "obetald",
    filters: ["invoice" as const], 
    createdAt: new Date("2024-01-05"),
    lastUsed: new Date("2024-01-18"),
    useCount: 22
  }
];

export const mockSearchHistory = [
  "Anna Andersson",
  "Storgatan 15",
  "serviceanmälan kran",
  "vakanta lägenheter",
  "obetalda fakturor"
];