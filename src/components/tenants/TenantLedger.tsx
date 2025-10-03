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
    return amount.toFixed(2).replace('.', ',');
  };

  const getInvoiceMethod = () => {
    if (ledger.invoiceSettings.eInvoice) return "E-faktura";
    if (ledger.invoiceSettings.smsInvoice) return "SMS-faktura";
    if (ledger.invoiceSettings.emailInvoice) return "E-postfaktura";
    return "Pappersfaktura";
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
          <CardTitle className="text-lg">Kundreskontra</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Autogiro och faktureringsinställningar */}
          <div className="space-y-1">
            <InfoRow 
              label="Autogiro" 
              value={ledger.autogiro.status}
            />
            <InfoRow 
              label="Alternativ för avisering" 
              value={getInvoiceMethod()}
            />
          </div>

          {/* Balans och saldon */}
          <div className="space-y-1 pt-4">
            <InfoRow 
              label="Förfallet" 
              value={formatCurrency(ledger.balances.overdue)}
              highlight={ledger.balances.overdue > 0}
            />
            <InfoRow 
              label="Inkasso" 
              value={formatCurrency(ledger.balances.collections)}
              highlight={ledger.balances.collections > 0}
            />
            <InfoRow 
              label="Överlämnade inkassoärenden" 
              value={ledger.balances.submittedToCollections}
              highlight={ledger.balances.submittedToCollections > 0}
            />
            <InfoRow 
              label="Återkallade inkassoärenden" 
              value={ledger.balances.recalledFromCollections}
            />
            <InfoRow 
              label="Prel. bokad återbetalning" 
              value={formatCurrency(ledger.balances.preliminaryRefund)}
            />
            <InfoRow 
              label="Antal krav senaste året" 
              value={ledger.statistics.demandsLastYear}
              highlight={ledger.statistics.demandsLastYear > 0}
            />
            <InfoRow 
              label="Medelvärde antal dagar för sent betalt" 
              value={formatCurrency(ledger.statistics.averageDaysLate)}
              highlight={ledger.statistics.averageDaysLate > 0}
            />
            <InfoRow 
              label="Deposition" 
              value={formatCurrency(ledger.balances.deposit)}
            />
            <InfoRow 
              label="Tillgodo" 
              value={formatCurrency(ledger.balances.credit)}
            />
            <InfoRow 
              label="Felaktig inbetalning" 
              value={formatCurrency(ledger.balances.incorrectPayment)}
              highlight={ledger.balances.incorrectPayment > 0}
            />
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

          {/* Positiv balans */}
          {ledger.balances.credit > 0 && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                Kunden har ett tillgodohavande på {formatCurrency(ledger.balances.credit)} kr.
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
