
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { History } from "lucide-react";
import type { Inspection } from "./types";
import { InspectionReadOnly } from "./InspectionReadOnly";

interface InspectionHistoryProps {
  inspections: Inspection[];
}

export const InspectionHistory = ({ inspections }: InspectionHistoryProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedInspection, setSelectedInspection] = useState<Inspection | null>(null);

  if (inspections.length === 0) return null;

  return (
    <>
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <History className="h-5 w-5" />
            Besiktningshistorik
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isExpanded ? (
            <div className="space-y-4">
              {inspections.map((inspection) => (
                <div
                  key={inspection.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                >
                  <div>
                    <p className="font-medium">
                      {format(new Date(inspection.date), "yyyy-MM-dd HH:mm")}
                    </p>
                    <p className="text-sm text-gray-600">
                      Besiktigad av: {inspection.inspectedBy}
                    </p>
                  </div>
                  <Button 
                    variant="outline"
                    onClick={() => setSelectedInspection(inspection)}
                  >
                    Visa
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
              <div>
                <p className="font-medium">
                  {format(new Date(inspections[0].date), "yyyy-MM-dd HH:mm")}
                </p>
                <p className="text-sm text-gray-600">
                  Besiktigad av: {inspections[0].inspectedBy}
                </p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  onClick={() => setSelectedInspection(inspections[0])}
                >
                  Visa
                </Button>
                <Button 
                  variant="ghost"
                  onClick={() => setIsExpanded(true)}
                >
                  Visa alla
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <InspectionReadOnly
        inspection={selectedInspection}
        isOpen={selectedInspection !== null}
        onClose={() => setSelectedInspection(null)}
      />
    </>
  );
};
