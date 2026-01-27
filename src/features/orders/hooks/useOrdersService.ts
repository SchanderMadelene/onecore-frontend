import { useState } from "react";
import { Order } from "../types";
import { activeOrdersMock, historicalOrdersMock } from "../data";

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

    setActiveOrders([newOrder, ...activeOrders]);
    return newOrder;
  };

  // Get orders for a specific residence ID
  const getOrdersByResidence = (residenceId?: string) => {
    if (!residenceId) {
      return { activeOrders, historicalOrders };
    }
    
    // Filter active orders - includes both "active" and "pending" status
    const filteredActive = activeOrders.filter(order => {
      const matches = order.residenceId === residenceId && 
        (order.status === "active" || order.status === "pending");
      return matches;
    });
    
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
