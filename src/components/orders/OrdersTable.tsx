
import { Order } from "@/hooks/useOrdersService";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface OrdersTableProps {
  orders: Order[];
}

export function OrdersTable({ orders }: OrdersTableProps) {
  const getPriorityBadge = (priority: Order["priority"]) => {
    switch (priority) {
      case "high":
        return <Badge variant="outline">Hög</Badge>;
      case "medium":
        return <Badge variant="outline">Medium</Badge>;
      case "low":
        return <Badge variant="outline">Låg</Badge>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "active":
        return <Badge variant="outline">Pågående</Badge>;
      case "pending":
        return <Badge variant="outline">Väntande</Badge>;
      case "resolved":
        return <Badge variant="outline">Åtgärdat</Badge>;
      default:
        return null;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Ärende</TableHead>
          <TableHead>Rapporterad</TableHead>
          <TableHead>Åtgärdat</TableHead>
          <TableHead>Prioritet</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>{order.title}</TableCell>
            <TableCell>{order.reportedDate}</TableCell>
            <TableCell>{order.resolvedDate}</TableCell>
            <TableCell>{getPriorityBadge(order.priority)}</TableCell>
            <TableCell>{getStatusBadge(order.status)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
