
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

  const getPriorityColor = (priority: string) => {
    return priorityColors[priority as keyof typeof priorityColors] || "bg-gray-100 text-gray-800";
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <CardTitle className="text-base font-medium">{orderItem.title}</CardTitle>
            <span className="text-sm text-muted-foreground">ID: {orderItem.id}</span>
          </div>
          <Badge className={getPriorityColor(orderItem.priority)}>
            {orderItem.priority === "low" ? "Låg" : 
            orderItem.priority === "medium" ? "Medium" : "Hög"}
          </Badge>
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
