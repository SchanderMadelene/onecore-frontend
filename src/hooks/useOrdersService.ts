
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
    residenceId: "lgh-1001" // Associate this order with lgh-1001
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
    residenceId: "lgh-1002"
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
    residenceId: "lgh-1001"
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
    residenceId: "lgh-1001"
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
