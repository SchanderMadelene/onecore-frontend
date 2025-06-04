
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const PropertyAccessTab = () => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Lås & passage</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Information om lås och passagesystem för fastigheten kommer att visas här.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
