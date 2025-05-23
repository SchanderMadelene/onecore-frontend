
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Order } from "@/hooks/useOrdersService";

type OrderCardProps = {
  orderItem: Order;
};

export function OrderCard({ orderItem }: OrderCardProps) {
  const priorityColors = {
    low: "bg-blue-100 text-blue-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  const statusColors = {
    active: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    resolved: "bg-slate-100 text-slate-800",
  };

  const getPriorityColor = (priority: string) => {
    return priorityColors[priority as keyof typeof priorityColors] || "bg-gray-100 text-gray-800";
  };

  const getStatusColor = (status: string) => {
    return statusColors[status as keyof typeof statusColors] || "bg-gray-100 text-gray-800";
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Pågående";
      case "pending": return "Väntande";
      case "resolved": return "Åtgärdat";
      default: return status;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <CardTitle className="text-base font-medium">{orderItem.title}</CardTitle>
            <span className="text-sm text-muted-foreground">ID: {orderItem.id}</span>
          </div>
          <div className="flex space-x-2">
            <Badge className={getPriorityColor(orderItem.priority)}>
              {orderItem.priority === "low" ? "Låg" : 
              orderItem.priority === "medium" ? "Medium" : "Hög"}
            </Badge>
            <Badge className={getStatusColor(orderItem.status)}>
              {getStatusText(orderItem.status)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm mb-2">{orderItem.description}</div>
        <div className="text-xs text-muted-foreground">
          <div>Rapporterad: {orderItem.reportedDate}</div>
          <div>Tilldelad: {orderItem.assignedTo}</div>
          {orderItem.plannedExecutionDate && (
            <div>Planerat utförande: {orderItem.plannedExecutionDate}</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
