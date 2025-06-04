
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const PropertyDocumentsTab = () => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Dokument</CardTitle>
      </CardHeader>
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
