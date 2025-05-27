
import { Order } from "@/hooks/useOrdersService";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface OrdersTableProps {
  orders: Order[];
}

export function OrdersTable({ orders }: OrdersTableProps) {
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Ärendenummer</TableHead>
          <TableHead>Ärende</TableHead>
          <TableHead>Skapad datum</TableHead>
          <TableHead>Förfallodatum</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Åtgärd</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>{order.title}</TableCell>
            <TableCell>{order.reportedDate}</TableCell>
            <TableCell>{order.dueDate || "-"}</TableCell>
            <TableCell>{getStatusBadge(order.status)}</TableCell>
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
  );
}
