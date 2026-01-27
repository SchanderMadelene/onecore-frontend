
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CheckCircle, User, Calendar } from "lucide-react";
import { format } from "date-fns";
import { sv } from "date-fns/locale";

interface CustomerReferenceProps {
  customerReferenceReceivedAt?: Date | null;
  housingReferenceUpdatedAt?: Date | null;
  updatedBy?: string | null;
  expiresAt?: Date | null;
}

const FormattedDateOrDash = ({ date }: { date: Date | null | undefined }) =>
  date ? <span>{format(date, 'yyyy-MM-dd', { locale: sv })}</span> : <span>-</span>;

export function CustomerReference({
  customerReferenceReceivedAt,
  housingReferenceUpdatedAt,
  updatedBy,
  expiresAt,
}: CustomerReferenceProps) {
  const hasConflict = customerReferenceReceivedAt && 
    housingReferenceUpdatedAt && 
    new Date(customerReferenceReceivedAt) > new Date(housingReferenceUpdatedAt);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Referenshistorik
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Referensuppgifter från kund</span>
            <div className="text-right">
              <FormattedDateOrDash date={customerReferenceReceivedAt} />
              {hasConflict && (
                <div className="text-sm text-destructive mt-1">
                  Obs! boendereferenserna har ändrats efter godkännandedatum
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Boendereferens hanterad/uppdaterad</span>
            <FormattedDateOrDash date={housingReferenceUpdatedAt} />
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Senast uppdaterad av</span>
            <span className="text-sm">{updatedBy || '-'}</span>
          </div>

          {expiresAt && (
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Giltig till</span>
              <FormattedDateOrDash date={expiresAt} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
