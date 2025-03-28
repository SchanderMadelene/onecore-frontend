
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Order } from "@/hooks/useOrdersService";

type OrdersTableProps = {
  orders: Order[];
};

export function OrdersTable({ orders }: OrdersTableProps) {
  const priorityColors = {
    low: "bg-blue-100 text-blue-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  const getPriorityColor = (priority: string) => {
    return priorityColors[priority as keyof typeof priorityColors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Titel</TableHead>
            <TableHead>Rapporterad</TableHead>
            <TableHead>Löst</TableHead>
            <TableHead>Prio</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.title}</TableCell>
              <TableCell>{order.reportedDate}</TableCell>
              <TableCell>{order.resolvedDate || "-"}</TableCell>
              <TableCell>
                <Badge className={getPriorityColor(order.priority)}>
                  {order.priority === "low" ? "Låg" : 
                   order.priority === "medium" ? "Medium" : "Hög"}
                </Badge>
              </TableCell>
              <TableCell>{order.status === "resolved" ? "Löst" : "Aktiv"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
