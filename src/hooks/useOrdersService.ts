
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
  roomId?: string;
  needsMasterKey?: boolean; // Added this property
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
    assignedTo: "Johan Andersson"
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
    assignedTo: "Erik Svensson"
  },
  {
    id: "C003",
    title: "Byte av kylskåp",
    reportedDate: "2023-04-20",
    status: "resolved",
    priority: "medium",
    description: "Kylskåpet kyler inte tillräckligt.",
    resolvedDate: "2023-04-25",
    assignedTo: "Johan Andersson"
  },
  {
    id: "C004",
    title: "Problem med element",
    reportedDate: "2023-02-05",
    status: "resolved",
    priority: "medium",
    description: "Elementet i vardagsrummet blir inte varmt.",
    resolvedDate: "2023-02-07",
    assignedTo: "Maria Nilsson"
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
    };

    console.log("Creating new order:", newOrder);
    
    // In a real app, this would be an API call
    setActiveOrders([newOrder, ...activeOrders]);
    return newOrder;
  };

  // More methods could be added here, like resolving an order, updating an order, etc.
  
  return {
    activeOrders,
    historicalOrders,
    createOrder,
  };
}
