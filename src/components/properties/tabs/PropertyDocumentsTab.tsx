
import { Card, CardContent } from "@/components/ui/card";

export const PropertyDocumentsTab = () => {
  return (
    <Card className="w-full">
      <CardContent>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Inga dokument tillgängliga för denna fastighet.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
