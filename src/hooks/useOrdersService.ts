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
      status: orderData.status || "pending", // Använd den status som skickas in eller "pending" som default
    };

    console.log("Creating new order:", newOrder);
    
    // In a real app, this would be an API call
    setActiveOrders([newOrder, ...activeOrders]);
    return newOrder;
  };

  // Get orders for a specific residence ID
  const getOrdersByResidence = (residenceId?: string) => {
    if (!residenceId) {
      return { activeOrders, historicalOrders };
    }
    
    // Filter active orders - includes both "active" and "pending" status för att visa nya ärenden direkt
    const filteredActive = activeOrders.filter(order => 
      order.residenceId === residenceId && 
      (order.status === "active" || order.status === "pending")
    );
    
    // Filter historical orders - only "resolved" status
    const filteredHistorical = historicalOrders.filter(order => 
      order.residenceId === residenceId && 
      order.status === "resolved"
    );
    
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
