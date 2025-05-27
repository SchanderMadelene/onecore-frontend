
import { Badge } from "@/components/ui/badge";

interface ContractInfoProps {
  primaryContractNumber: string;
  secondaryContractNumber?: string;
  isSecondaryRental: boolean;
}

export function ContractInfo({ 
  primaryContractNumber, 
  secondaryContractNumber,
  isSecondaryRental 
}: ContractInfoProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end">
        {isSecondaryRental && (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Andrahandsuthyrning
          </Badge>
        )}
      </div>
      
      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Kontraktsnummer</p>
            <p className="font-medium">{primaryContractNumber}</p>
          </div>
          {secondaryContractNumber && (
            <div>
              <p className="text-sm text-muted-foreground">Andrahandskontrakt</p>
              <p className="font-medium">{secondaryContractNumber}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
