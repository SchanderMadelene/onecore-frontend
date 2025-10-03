import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { Invoice } from "@/types/invoice";
import { useIsMobile } from "@/hooks/use-mobile";

interface InvoicesOverviewProps {
  invoices: Invoice[];
}

export const InvoicesOverview = ({ invoices }: InvoicesOverviewProps) => {
  const [expandedInvoices, setExpandedInvoices] = useState<Set<string>>(new Set());
  const isMobile = useIsMobile();

  const toggleInvoice = (invoiceNumber: string) => {
    const newExpanded = new Set(expandedInvoices);
    if (newExpanded.has(invoiceNumber)) {
      newExpanded.delete(invoiceNumber);
    } else {
      newExpanded.add(invoiceNumber);
    }
    setExpandedInvoices(newExpanded);
  };

  const getStatusVariant = (status: Invoice["paymentStatus"]) => {
    switch (status) {
      case "Betald":
        return "default";
      case "Obetald":
        return "secondary";
      case "Försenad":
        return "destructive";
      case "Delvis betald":
        return "outline";
      default:
        return "secondary";
    }
  };

  const formatCurrency = (amount: number) => {
    return amount.toFixed(2).replace('.', ',');
  };

  if (isMobile) {
    return (
      <div className="space-y-3">
        {invoices.map((invoice) => (
          <Card key={invoice.invoiceNumber}>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{invoice.invoiceNumber}</p>
                    <p className="text-sm text-muted-foreground">{invoice.invoiceType}</p>
                  </div>
                  <Badge variant={getStatusVariant(invoice.paymentStatus)}>
                    {invoice.paymentStatus}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Fakturadatum</p>
                    <p className="font-medium">{invoice.invoiceDate}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Förfallodatum</p>
                    <p className="font-medium">{invoice.dueDate}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Belopp</p>
                    <p className="font-medium">{formatCurrency(invoice.amount)} kr</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Referens</p>
                    <p className="font-medium">{invoice.reference}</p>
                  </div>
                </div>

                {invoice.lineItems.length > 0 && (
                  <button
                    onClick={() => toggleInvoice(invoice.invoiceNumber)}
                    className="flex items-center gap-2 text-sm text-primary hover:underline w-full"
                  >
                    {expandedInvoices.has(invoice.invoiceNumber) ? (
                      <>
                        <ChevronUp className="h-4 w-4" />
                        Dölj detaljer
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4" />
                        Visa detaljer
                      </>
                    )}
                  </button>
                )}

                {expandedInvoices.has(invoice.invoiceNumber) && invoice.lineItems.length > 0 && (
                  <div className="pt-3 border-t space-y-2">
                    {invoice.lineItems.map((item, idx) => (
                      <div key={idx} className="text-sm space-y-1 pb-2 border-b last:border-0">
                        <p className="font-medium">{item.description}</p>
                        {item.rentArticle && (
                          <p className="text-muted-foreground text-xs">{item.rentArticle}</p>
                        )}
                        <div className="flex justify-between text-xs">
                          <span>Belopp: {formatCurrency(item.amount)} kr</span>
                          <span>Totalt: {formatCurrency(item.total)} kr</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-3 text-sm font-medium">Fakturanummer</th>
              <th className="text-left p-3 text-sm font-medium">Fakturadatum</th>
              <th className="text-left p-3 text-sm font-medium">Förfallodatum</th>
              <th className="text-right p-3 text-sm font-medium">Belopp</th>
              <th className="text-left p-3 text-sm font-medium">Referens</th>
              <th className="text-left p-3 text-sm font-medium">Fakturatyp</th>
              <th className="text-left p-3 text-sm font-medium">Betalstatus</th>
              <th className="w-12"></th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <>
                <tr 
                  key={invoice.invoiceNumber}
                  className="border-t hover:bg-muted/30 cursor-pointer"
                  onClick={() => invoice.lineItems.length > 0 && toggleInvoice(invoice.invoiceNumber)}
                >
                  <td className="p-3 text-sm">{invoice.invoiceNumber}</td>
                  <td className="p-3 text-sm">{invoice.invoiceDate}</td>
                  <td className="p-3 text-sm">{invoice.dueDate}</td>
                  <td className="p-3 text-sm text-right">{formatCurrency(invoice.amount)}</td>
                  <td className="p-3 text-sm">{invoice.reference}</td>
                  <td className="p-3 text-sm">{invoice.invoiceType}</td>
                  <td className="p-3 text-sm">
                    <Badge variant={getStatusVariant(invoice.paymentStatus)}>
                      {invoice.paymentStatus}
                    </Badge>
                  </td>
                  <td className="p-3 text-sm">
                    {invoice.lineItems.length > 0 && (
                      expandedInvoices.has(invoice.invoiceNumber) ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )
                    )}
                  </td>
                </tr>
                {expandedInvoices.has(invoice.invoiceNumber) && invoice.lineItems.length > 0 && (
                  <tr className="bg-muted/20">
                    <td colSpan={8} className="p-0">
                      <div className="p-4">
                        {invoice.text && (
                          <p className="text-sm mb-3">
                            <strong>Text:</strong> {invoice.text}
                          </p>
                        )}
                        <table className="w-full">
                          <thead className="bg-muted/50">
                            <tr>
                              <th className="text-right p-2 text-xs font-medium">Belopp</th>
                              <th className="text-right p-2 text-xs font-medium">Moms</th>
                              <th className="text-right p-2 text-xs font-medium">Totalt</th>
                              <th className="text-left p-2 text-xs font-medium">Hyresartikel</th>
                              <th className="text-left p-2 text-xs font-medium">Beskrivning</th>
                              <th className="text-left p-2 text-xs font-medium">Utskriftsgrupp</th>
                            </tr>
                          </thead>
                          <tbody>
                            {invoice.lineItems.map((item, idx) => (
                              <tr key={idx} className="border-t border-border/50">
                                <td className="p-2 text-xs text-right">{formatCurrency(item.amount)}</td>
                                <td className="p-2 text-xs text-right">{formatCurrency(item.vat)}</td>
                                <td className="p-2 text-xs text-right">{formatCurrency(item.total)}</td>
                                <td className="p-2 text-xs">{item.rentArticle || "-"}</td>
                                <td className="p-2 text-xs">{item.description}</td>
                                <td className="p-2 text-xs">{item.printGroup || "-"}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
