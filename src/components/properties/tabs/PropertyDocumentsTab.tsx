
import { FileText } from "lucide-react";

export const PropertyDocumentsTab = () => {
  return (
    <div className="border rounded-lg p-6 text-center">
      <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-xl font-medium mb-2">Dokument</h3>
      <p className="text-muted-foreground">
        Inga dokument tillgängliga för denna fastighet.
      </p>
    </div>
  );
};
