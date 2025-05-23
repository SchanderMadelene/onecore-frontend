
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
        return <Badge variant="outline" className="bg-red-100 text-red-800">Hög</Badge>;
      case "medium":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case "low":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Låg</Badge>;
      default:
        return null;
    }
  };

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
