import { useState } from "react";

export interface Order {
  id: string;
  title: string;
  reportedDate: string;
  status: string;
  priority: string;
  description: string;
  assignedTo: string;
  resolvedDate?: string;
  category?: string;
  roomId?: string;
  needsMasterKey?: boolean;
  plannedExecutionDate?: string;
  dueDate?: string;
  residenceId?: string;
  type?: "Odoo" | "Xpand";
}

// Mock order data
const activeOrdersMock: Order[] = [
  {
    id: "od-211",
    title: "WEBB: Felanmäld Lägenhet - Tvättmaskin",
    reportedDate: "2025-04-28",
    status: "pending",
    priority: "medium",
    description: "Väntar på handläggning",
    assignedTo: "Johan Andersson",
    category: "Vitvaror",
    residenceId: "lgh-1001",
    type: "Odoo"
  },
  // Property-specific orders for Odenplan 5
  {
    id: "prop-001",
    title: "Lekplats - Trasig gunga",
    reportedDate: "2025-05-15",
    status: "pending",
    priority: "high",
    description: "En av gungorna på lekplatsen har trasiga kedjor och behöver repareras omgående av säkerhetsskäl.",
    assignedTo: "Magnus Lindberg",
    category: "Lekplats",
    residenceId: "vasteras/lundby/odenplan-5",
    type: "Odoo"
  },
  {
    id: "prop-002",
    title: "Gemensamhetslokal - Belysning",
    reportedDate: "2025-05-12",
    status: "active",
    priority: "medium",
    description: "Flera lampor i gemensamhetslokalen i källaren fungerar inte. Behöver bytas ut.",
    assignedTo: "Anna Petersson",
    category: "Belysning",
    residenceId: "vasteras/lundby/odenplan-5",
    type: "Xpand"
  },
  {
    id: "prop-003",
    title: "Parkering - Grindautomatik",
    reportedDate: "2025-05-10",
    status: "pending",
    priority: "medium",
    description: "Automatiska grinden till parkeringen öppnar och stänger inte korrekt. Hyresgäster får problem att komma in och ut.",
    assignedTo: "Erik Svensson",
    category: "Säkerhet",
    residenceId: "vasteras/lundby/odenplan-5",
    type: "Odoo"
  }
];

const historicalOrdersMock: Order[] = [
  {
    id: "C000",
    title: "Stopp i avlopp",
    reportedDate: "2023-05-10",
    status: "resolved",
    priority: "medium",
    description: "Handfatet i badrummet töms långsamt.",
    resolvedDate: "2023-05-12",
    assignedTo: "Erik Svensson",
    dueDate: "2023-05-15",
    residenceId: "lgh-1002",
    type: "Xpand"
  },
  {
    id: "C003",
    title: "Byte av kylskåp",
    reportedDate: "2023-04-20",
    status: "resolved",
    priority: "medium",
    description: "Kylskåpet kyler inte tillräckligt.",
    resolvedDate: "2023-04-25",
    assignedTo: "Johan Andersson",
    dueDate: "2023-04-30",
    residenceId: "lgh-1001",
    type: "Odoo"
  },
  // Historical property-specific orders
  {
    id: "prop-hist-001",
    title: "Gården - Snöröjning",
    reportedDate: "2024-12-15",
    status: "resolved",
    priority: "high",
    description: "Snöröjning av gångvägar och parkeringsplatser efter kraftigt snöfall.",
    resolvedDate: "2024-12-16",
    assignedTo: "Städservice AB",
    category: "Skötsel",
    residenceId: "vasteras/lundby/odenplan-5",
    type: "Xpand"
  },
  {
    id: "prop-hist-002",
    title: "Fasad - Graffitisanering",
    reportedDate: "2024-11-08",
    status: "resolved",
    priority: "medium",
    description: "Klotter på fasadens södra sida behöver tas bort. Anmälan gjord till polis.",
    resolvedDate: "2024-11-12",
    assignedTo: "Fasadteknik Stockholm",
    category: "Fasad",
    residenceId: "vasteras/lundby/odenplan-5",
    type: "Odoo"
  },
  {
    id: "prop-hist-003",
    title: "Sophantering - Återvinningsstation",
    reportedDate: "2024-10-22",
    status: "resolved",
    priority: "low",
    description: "Återvinningsstationen är överfull och behöver tömmas extra ofta under renoveringsperioden.",
    resolvedDate: "2024-10-23",
    assignedTo: "Renhållningen",
    category: "Avfall",
    residenceId: "vasteras/lundby/odenplan-5",
    type: "Xpand"
  },
  {
    id: "prop-hist-004",
    title: "Cykelparkering - Nya cykelställ",
    reportedDate: "2024-09-10",
    status: "resolved",
    priority: "medium",
    description: "Installation av ytterligare cykelställ i cykelförrådet på grund av ökad efterfrågan från hyresgäster.",
    resolvedDate: "2024-09-18",
    assignedTo: "Metallarbeten AB",
    category: "Parkering",
    residenceId: "vasteras/lundby/odenplan-5",
    type: "Odoo"
  },
  {
    id: "prop-hist-005",
    title: "Entrédörr - Kodlås",
    reportedDate: "2024-08-15",
    status: "resolved",
    priority: "high",
    description: "Kodlåset på huvudentrén fungerar inte. Hyresgäster kan inte komma in i byggnaden.",
    resolvedDate: "2024-08-16",
    assignedTo: "Låsservice Sverige",
    category: "Säkerhet",
    residenceId: "vasteras/lundby/odenplan-5",
    type: "Xpand"
  },
  {
    id: "prop-hist-006",
    title: "Trappuppgång - Rengöring",
    reportedDate: "2024-07-25",
    status: "resolved",
    priority: "low",
    description: "Extra städning av trapphus efter målningsarbeten. Damm och färgfläckar behöver tas bort.",
    resolvedDate: "2024-07-26",
    assignedTo: "Städservice AB",
    category: "Städning",
    residenceId: "vasteras/lundby/odenplan-5",
    type: "Odoo"
  },
  {
    id: "prop-hist-007",
    title: "Ventilation - Rottillstämning",
    reportedDate: "2024-06-12",
    status: "resolved",
    priority: "medium",
    description: "Ventilationsanläggningen behöver rengöras och rottas för att förbättra luftkvaliteten.",
    resolvedDate: "2024-06-20",
    assignedTo: "Ventilation Pro",
    category: "Ventilation",
    residenceId: "vasteras/lundby/odenplan-5",
    type: "Xpand"
  },
  {
    id: "prop-hist-008",
    title: "Lekplats - Sandlåda",
    reportedDate: "2024-05-08",
    status: "resolved",
    priority: "medium",
    description: "Byte av sand i sandlådan och kontroll av säkerhetsavstånd runt lekredskap.",
    resolvedDate: "2024-05-15",
    assignedTo: "Lekplatsservice",
    category: "Lekplats",
    residenceId: "vasteras/lundby/odenplan-5",
    type: "Odoo"
  },
  {
    id: "C004",
    title: "Problem med element",
    reportedDate: "2023-02-05",
    status: "resolved",
    priority: "medium",
    description: "Elementet i vardagsrummet blir inte varmt.",
    resolvedDate: "2023-02-07",
    assignedTo: "Maria Nilsson",
    dueDate: "2023-02-10",
    residenceId: "lgh-1001",
    type: "Xpand"
  },
  {
    id: "C005",
    title: "Trasig spis",
    reportedDate: "2023-01-15",
    status: "resolved",
    priority: "high",
    description: "Spisen fungerar inte, två plattor är trasiga.",
    resolvedDate: "2023-01-18",
    assignedTo: "Per Gustafsson",
    dueDate: "2023-01-20",
    residenceId: "lgh-1001",
    type: "Odoo"
  },
  {
    id: "C006",
    title: "Fuktskada i badrummet",
    reportedDate: "2022-12-10",
    status: "resolved",
    priority: "high",
    description: "Fukt upptäckt bakom kaklet i duschen.",
    resolvedDate: "2022-12-20",
    assignedTo: "Anna Lindström",
    dueDate: "2022-12-25",
    residenceId: "lgh-1001",
    type: "Xpand"
  },
  {
    id: "C007",
    title: "Trasig dörrklocka",
    reportedDate: "2022-11-05",
    status: "resolved",
    priority: "low",
    description: "Dörrklockan fungerar inte.",
    resolvedDate: "2022-11-08",
    assignedTo: "Erik Svensson",
    dueDate: "2022-11-15",
    residenceId: "lgh-1001",
    type: "Odoo"
  },
  {
    id: "C008",
    title: "Glödlampa i hall",
    reportedDate: "2022-10-20",
    status: "resolved",
    priority: "low",
    description: "Glödlampan i hallen behöver bytas.",
    resolvedDate: "2022-10-21",
    assignedTo: "Johan Andersson",
    dueDate: "2022-10-25",
    residenceId: "lgh-1001",
    type: "Xpand"
  },
  {
    id: "C009",
    title: "Läckage från diskmaskin",
    reportedDate: "2022-09-12",
    status: "resolved",
    priority: "medium",
    description: "Diskmaskinens dörr läcker vatten på golvet.",
    resolvedDate: "2022-09-15",
    assignedTo: "Maria Nilsson",
    dueDate: "2022-09-20",
    residenceId: "lgh-1001",
    type: "Odoo"
  },
  {
    id: "C010",
    title: "Ventilationsproblem",
    reportedDate: "2022-08-30",
    status: "resolved",
    priority: "medium",
    description: "Ventilationen i köket fungerar dåligt.",
    resolvedDate: "2022-09-05",
    assignedTo: "Per Gustafsson",
    dueDate: "2022-09-10",
    residenceId: "lgh-1001",
    type: "Xpand"
  },
  {
    id: "C011",
    title: "Knarrande golvbrädor",
    reportedDate: "2022-07-18",
    status: "resolved",
    priority: "low",
    description: "Golvbrädorna i sovrummet knarrar mycket.",
    resolvedDate: "2022-07-25",
    assignedTo: "Anna Lindström",
    dueDate: "2022-08-01",
    residenceId: "lgh-1001",
    type: "Odoo"
  }
];

// In a real application, this would likely be backed by an API service
export function useOrdersService() {
  const [activeOrders, setActiveOrders] = useState<Order[]>(activeOrdersMock);
  const [historicalOrders, setHistoricalOrders] = useState<Order[]>(historicalOrdersMock);

  const createOrder = (orderData: Omit<Order, "id">) => {
    const newOrder: Order = {
      ...orderData,
      id: `C${(activeOrders.length + historicalOrders.length + 10).toString().padStart(3, '0')}`,
      status: orderData.status || "pending",
    };

    console.log("Creating new order:", newOrder);
    
    setActiveOrders([newOrder, ...activeOrders]);
    return newOrder;
  };

  // Get orders for a specific residence ID
  const getOrdersByResidence = (residenceId?: string) => {
    console.log("Filtering orders for residenceId:", residenceId);
    
    if (!residenceId) {
      return { activeOrders, historicalOrders };
    }
    
    // Filter active orders - includes both "active" and "pending" status
    const filteredActive = activeOrders.filter(order => {
      const matches = order.residenceId === residenceId && 
        (order.status === "active" || order.status === "pending");
      console.log(`Order ${order.id} (${order.residenceId}) matches ${residenceId}:`, matches);
      return matches;
    });
    
    // Filter historical orders - only "resolved" status
    const filteredHistorical = historicalOrders.filter(order => 
      order.residenceId === residenceId && 
      order.status === "resolved"
    );
    
    console.log("Filtered active orders:", filteredActive.length);
    console.log("Filtered historical orders:", filteredHistorical.length);
    
    return { 
      activeOrders: filteredActive, 
      historicalOrders: filteredHistorical 
    };
  };
  
  return {
    activeOrders,
    historicalOrders,
    createOrder,
    getOrdersByResidence,
  };
}
