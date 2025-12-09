import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CustomerLedger } from "@/types/ledger";
import type { Invoice } from "@/types/invoice";
import { Badge } from "@/components/ui/badge";
import { InvoicesTable } from "./InvoicesTable";

interface TenantLedgerProps {
  ledger: CustomerLedger;
  invoices: Invoice[];
}

export const TenantLedger = ({ ledger, invoices }: TenantLedgerProps) => {
  const formatCurrency = (amount: number) => {
    return amount.toFixed(2).replace('.', ',') + ' SEK';
  };

  const getInvoiceMethodLabel = () => {
    switch (ledger.invoiceMethod) {
      case 'e-faktura': return 'E-faktura';
      case 'pappersfaktura-kivra': return 'Pappersfaktura/Kivra';
      case 'autogiro': return 'Autogiro';
      default: return 'Pappersfaktura/Kivra';
    }
  };

  const InfoRow = ({ label, value, highlight = false }: { label: string; value: string | number; highlight?: boolean }) => (
    <div className="flex justify-between py-2 border-b border-border last:border-0">
      <span className="text-sm text-muted-foreground">{label}:</span>
      <span className={`text-sm font-medium ${highlight ? 'text-destructive' : ''}`}>{value}</span>
    </div>
  );

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Betalningsinformation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Faktureringsinställningar */}
          <div className="space-y-1">
            <InfoRow 
              label="Alternativ för avisering" 
              value={getInvoiceMethodLabel()}
            />
            {ledger.invoiceMethod === 'autogiro' && ledger.autogiroDate && (
              <InfoRow 
                label="Autogiro-dragning" 
                value={ledger.autogiroDate}
              />
            )}
          </div>

          {/* Balans och saldon */}
          <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <div className="space-y-1">
            <InfoRow 
              label="Totalsumma förfallet" 
              value={formatCurrency(ledger.balances.overdue)}
                highlight={ledger.balances.overdue > 0}
              />
            <InfoRow 
              label="Totalsumma inkasso" 
              value={formatCurrency(ledger.balances.collections)}
                highlight={ledger.balances.collections > 0}
              />
              <InfoRow 
                label="Överlämnade inkassoärenden" 
                value={ledger.balances.submittedToCollections}
                highlight={ledger.balances.submittedToCollections > 0}
              />
            </div>
            <div className="space-y-1">
              <InfoRow 
                label="Medelvärde antal dagar för sent betalt" 
                value={`${ledger.statistics.averageDaysLate} dagar`}
                highlight={ledger.statistics.averageDaysLate > 0}
              />
              <InfoRow 
                label="Antal skickade fakturor till inkasso" 
                value={ledger.statistics.invoicesSentToCollections}
                highlight={ledger.statistics.invoicesSentToCollections > 0}
              />
              <InfoRow 
                label="Antal anstånd senaste 12 månaderna" 
                value={ledger.statistics.defermentLast12Months}
                highlight={ledger.statistics.defermentLast12Months > 0}
              />
            </div>
          </div>

          {/* Varningsmeddelande om det finns problem */}
          {(ledger.balances.overdue > 0 || 
            ledger.balances.collections > 0 || 
            ledger.balances.submittedToCollections > 0) && (
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800">
                <strong>OBS:</strong> Kunden har utestående betalningar eller inkassoärenden.
              </p>
            </div>
          )}

        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Fakturor</CardTitle>
        </CardHeader>
        <CardContent>
          <InvoicesTable invoices={invoices} />
        </CardContent>
      </Card>
    </div>
  );
};
