
import { useState } from "react";

// Define the Order type directly in this file since we don't have OrderForm.tsx yet
export interface Order {
  id: string;
  title: string;
  reportedDate: string;
  status: string;
  priority: string;
  description: string;
  assignedTo: string;
  resolvedDate?: string;
}

// Mock order data
const activeOrdersMock: Order[] = [
  {
    id: "C001",
    title: "Vattenläcka i kök",
    reportedDate: "2023-08-15",
    status: "active",
    priority: "high",
    description: "Läckage under diskbänken, vatten samlas på golvet.",
    assignedTo: "Johan Andersson"
  },
  {
    id: "C002",
    title: "Trasigt dörrhandtag",
    reportedDate: "2023-09-02",
    status: "pending",
    priority: "low",
    description: "Badrumsdörrens handtag har lossnat.",
    assignedTo: "Maria Nilsson"
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
