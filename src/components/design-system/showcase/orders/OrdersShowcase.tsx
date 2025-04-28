
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderCard } from "@/components/orders/OrderCard";

const sampleOrder = {
  id: "OD-123",
  title: "WEBB: Felanmäld Lägenhet - Tvättmaskin",
  description: "Väntar på handläggning",
  reportedDate: "2025-04-28",
  status: "pending",
  priority: "medium",
  assignedTo: "Johan Andersson"
};

export const OrdersShowcase = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Cards</CardTitle>
        <CardDescription>Cards used for displaying maintenance orders</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-2">
        <OrderCard orderItem={sampleOrder} />
      </CardContent>
    </Card>
  );
};

