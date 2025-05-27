
import { Order } from "@/hooks/useOrdersService";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface OrdersTableProps {
  orders: Order[];
}

export function OrdersTable({ orders }: OrdersTableProps) {
  const [showAll, setShowAll] = useState(false);
  const displayedOrders = showAll ? orders : orders.slice(0, 5);
  const hasMoreOrders = orders.length > 5;

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "active":
        return <Badge variant="outline" className="bg-green-100 text-green-800">Pågående</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Väntande</Badge>;
      case "resolved":
        return <Badge variant="outline" className="bg-slate-100 text-slate-800">Åtgärdat</Badge>;
      default:
        return null;
    }
  };

  const handleOpenOrder = (orderId: string) => {
    console.log("Öppnar ärende:", orderId);
    // Här kan du lägga till navigering eller modal för att visa ärendedetaljer
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ärendenummer</TableHead>
            <TableHead>Ärende</TableHead>
            <TableHead>Skapad datum</TableHead>
            <TableHead>Förfallodatum</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Typ</TableHead>
            <TableHead>Åtgärd</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.title}</TableCell>
              <TableCell>{order.reportedDate}</TableCell>
              <TableCell>{order.dueDate || "-"}</TableCell>
              <TableCell>{getStatusBadge(order.status)}</TableCell>
              <TableCell>{order.type || "-"}</TableCell>
              <TableCell>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleOpenOrder(order.id)}
                >
                  Öppna
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {hasMoreOrders && !showAll && (
        <div className="flex justify-center">
          <Button 
            variant="outline" 
            onClick={() => setShowAll(true)}
          >
            Se fler ({orders.length - 5} till)
          </Button>
        </div>
      )}
      
      {showAll && hasMoreOrders && (
        <div className="flex justify-center">
          <Button 
            variant="outline" 
            onClick={() => setShowAll(false)}
          >
            Visa färre
          </Button>
        </div>
      )}
    </div>
  );
}
