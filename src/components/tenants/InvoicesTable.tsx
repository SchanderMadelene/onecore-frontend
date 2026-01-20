import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, FileText, Link2 } from "lucide-react";
import type { Invoice } from "@/types/invoice";
import { useIsMobile } from "@/hooks/use-mobile";
import { differenceInDays, parseISO } from "date-fns";

interface InvoicesTableProps {
  invoices: Invoice[];
}

export const InvoicesTable = ({ invoices }: InvoicesTableProps) => {
  const [expandedInvoice, setExpandedInvoice] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const formatCurrency = (amount: number) => {
    return amount.toFixed(2).replace('.', ',') + ' SEK';
  };

  const getStatusVariant = (status: Invoice['paymentStatus']) => {
    switch (status) {
      case 'Betald':
        return 'success';
      case 'Obetald':
        return 'secondary';
      case 'Delvis betald':
        return 'priority-medium'; // gul badge för delvis betalda
      case 'Förfallen':
        return 'destructive';
      case 'Krediterad':
        return 'secondary'; // fakturan är hanterad/stängd
      case 'Kredit':
        return 'outline'; // kreditfaktura (med negativt belopp)
      case 'Delkrediterad':
        return 'priority-medium'; // gul badge för delkrediterade
      default:
        return 'secondary';
    }
  };

  const toggleExpand = (invoiceNumber: string) => {
    setExpandedInvoice(expandedInvoice === invoiceNumber ? null : invoiceNumber);
  };

  const getOverdueDays = (dueDate: string): number => {
    const today = new Date();
    const due = parseISO(dueDate);
    return differenceInDays(today, due);
  };

  const getStatusText = (invoice: Invoice): string => {
    if (invoice.paymentStatus === 'Förfallen') {
      const days = getOverdueDays(invoice.dueDate);
      return `Förfallen (${days} dagar)`;
    }
    return invoice.paymentStatus;
  };

  const handleOpenPDF = (invoiceNumber: string) => {
    // TODO: Implement PDF opening logic
    console.log('Opening PDF for invoice:', invoiceNumber);
  };

  if (isMobile) {
    return (
      <div className="space-y-3">
        {invoices.map((invoice) => {
          const isExpanded = expandedInvoice === invoice.invoiceNumber;
          return (
            <Card key={invoice.invoiceNumber} className="overflow-hidden">
              <div 
                className="p-4 cursor-pointer"
                onClick={() => toggleExpand(invoice.invoiceNumber)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="space-y-1">
                    <div className="font-medium">{invoice.invoiceNumber}</div>
                    <div className="text-sm text-muted-foreground">{invoice.invoiceType}</div>
                  </div>
                  <Badge variant={getStatusVariant(invoice.paymentStatus)}>
                    {getStatusText(invoice)}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Belopp:</span>
                    <span className="font-medium">{formatCurrency(invoice.amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Inkasso:</span>
                    <span>{invoice.inCollection ? 'Ja' : 'Nej'}</span>
                  </div>
                  {invoice.deferralDate && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Anståndsdatum:</span>
                      <span>{invoice.deferralDate}</span>
                    </div>
                  )}
                </div>
                <div className="mt-2 flex items-center text-sm text-muted-foreground">
                  {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  <span className="ml-1">Fakturarader</span>
                </div>
              </div>
              
              {isExpanded && invoice.lineItems.length > 0 && (
                <div className="border-t bg-muted/30 p-4 space-y-4">
                  {/* Statisk info */}
                    {((invoice.text && invoice.paymentStatus !== 'Kredit') || 
                    (invoice.relatedInvoiceNumber && (invoice.paymentStatus === 'Krediterad' || invoice.paymentStatus === 'Kredit')) ||
                    (invoice.creditEvents && invoice.creditEvents.length > 0 && invoice.paymentStatus === 'Delkrediterad')) && (
                    <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                      {invoice.text && invoice.paymentStatus !== 'Kredit' && (
                        <div className="text-sm">
                          <span className="text-muted-foreground">Text:</span>{' '}
                          <span className="font-medium">{invoice.text}</span>
                        </div>
                      )}
                      {invoice.relatedInvoiceNumber && (invoice.paymentStatus === 'Krediterad' || invoice.paymentStatus === 'Kredit') && (
                        <div className="flex items-center gap-2 text-sm">
                          <Link2 className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {invoice.paymentStatus === 'Krediterad' ? 'Krediteras av faktura:' : 'Krediterar faktura:'}
                          </span>
                          <span className="font-semibold">{invoice.relatedInvoiceNumber}</span>
                        </div>
                      )}
                      {invoice.creditEvents && invoice.creditEvents.length > 0 && invoice.paymentStatus === 'Delkrediterad' && (
                        <div className="flex items-center gap-2 text-sm">
                          <Link2 className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Delkrediteras av fakturor:</span>
                          <span className="font-semibold">{invoice.creditEvents.map(e => e.relatedInvoiceNumber).join(', ')}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Händelser */}
                  {(invoice.inCollection || 
                    (invoice.preliminaryRefund && invoice.preliminaryRefund > 0 && invoice.paymentStatus !== 'Kredit' && invoice.paymentStatus !== 'Betald') ||
                    invoice.paymentStatus === 'Delvis betald' ||
                    invoice.paymentStatus === 'Betald' ||
                    (invoice.creditEvents && invoice.creditEvents.length > 0) ||
                    (invoice.paymentStatus === 'Kredit' && invoice.creditBookedDate)) && (
                    <div className="space-y-2">
                      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Händelser</div>
                      
                      {invoice.inCollection && invoice.inCollectionDate && (
                        <div className="bg-destructive/10 rounded-lg p-3 border-l-4 border-destructive">
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground block mb-1">Datum:</span>
                              <span className="font-semibold">{invoice.inCollectionDate}</span>
                            </div>
                            <div className="col-span-2">
                              <span className="text-muted-foreground block mb-1">Händelse:</span>
                              <span className="font-semibold text-destructive">Skickad till inkasso</span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {invoice.paymentStatus === 'Kredit' && invoice.creditBookedDate && (
                        <div className="bg-priority-medium/10 rounded-lg p-3 border-l-4 border-priority-medium">
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground block mb-1">Datum:</span>
                              <span className="font-semibold">{invoice.creditBookedDate}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground block mb-1">Händelse:</span>
                              <span className="font-semibold">Kreditering bokad</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground block mb-1">Krediterat belopp:</span>
                              <span className="font-semibold text-priority-medium">{formatCurrency(invoice.amount)}</span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {invoice.creditEvents && invoice.creditEvents.map((event, index) => (
                        <div key={index} className="bg-priority-medium/10 rounded-lg p-3 border-l-4 border-priority-medium">
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground block mb-1">Datum:</span>
                              <span className="font-semibold">{event.date}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground block mb-1">Händelse:</span>
                              <span className="font-semibold">Delkrediterad</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground block mb-1">Krediterat belopp:</span>
                              <span className="font-semibold text-priority-medium">{formatCurrency(event.amount)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {invoice.preliminaryRefund && invoice.preliminaryRefund > 0 && invoice.paymentStatus !== 'Kredit' && invoice.paymentStatus !== 'Betald' && (
                        <div className="bg-warning/10 rounded-lg p-3 border-l-4 border-warning">
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground block mb-1">Planerat datum:</span>
                              <span className="font-semibold">{invoice.preliminaryRefundDate || '–'}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground block mb-1">Händelse:</span>
                              <span className="font-semibold">Prel. återbetalning</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground block mb-1">Belopp:</span>
                              <span className="font-semibold text-warning">{formatCurrency(invoice.preliminaryRefund)}</span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {invoice.paymentStatus === 'Delvis betald' && invoice.paidAmount !== undefined && (
                        <div className="bg-priority-medium/10 rounded-lg p-3 border-l-4 border-priority-medium">
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground block mb-1">Datum:</span>
                              <span className="font-semibold">{invoice.paymentDate || '–'}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground block mb-1">Inbetalt:</span>
                              <span className="font-semibold">{formatCurrency(invoice.paidAmount)}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground block mb-1">Kvar att betala:</span>
                              <span className="font-semibold text-priority-medium">{formatCurrency(invoice.amount - invoice.paidAmount)}</span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {invoice.paymentStatus === 'Betald' && invoice.paymentDate && invoice.paidAmount !== undefined && (
                        <div className="bg-success/5 rounded-lg p-3 border-l-4 border-success">
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground block mb-1">Datum:</span>
                              <span className="font-semibold">{invoice.paymentDate}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground block mb-1">Källa:</span>
                              <span className="font-semibold">{invoice.paymentSource || 'OCR'}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground block mb-1">Inbetalat:</span>
                              <span className="font-semibold text-success">{formatCurrency(invoice.paidAmount)}</span>
                            </div>
                          </div>
                          {invoice.invoiceType === 'Ströfaktura' && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenPDF(invoice.invoiceNumber);
                              }}
                              className="w-full mt-3"
                            >
                              <FileText className="h-4 w-4 mr-2" />
                              Öppna PDF
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Fakturarader */}
                  <div className="space-y-2">
                    {invoice.lineItems.map((item, idx) => (
                      <div key={idx} className="bg-background rounded-lg p-3 text-sm">
                        <div className="font-medium mb-1">{item.description}</div>
                        {item.rentalArticle && (
                          <div className="text-muted-foreground text-xs mb-1">
                            {item.rentalArticle}
                          </div>
                        )}
                        <div className="flex justify-between mt-2">
                          <span className="text-muted-foreground">Belopp:</span>
                          <span>{formatCurrency(item.amount)}</span>
                        </div>
                        {item.printGroup && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Grupp:</span>
                            <span>{item.printGroup}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    );
  }

  return (
    <div className="rounded-lg border">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="text-left p-3 text-sm font-medium">Fakturanummer</th>
            <th className="text-left p-3 text-sm font-medium">Fakturadatum</th>
            <th className="text-left p-3 text-sm font-medium">Förfallodatum</th>
            <th className="text-right p-3 text-sm font-medium">Belopp</th>
            <th className="text-right p-3 text-sm font-medium">Saldo</th>
            <th className="text-left p-3 text-sm font-medium">Fakturatyp</th>
            <th className="text-left p-3 text-sm font-medium">Inkasso</th>
            <th className="text-left p-3 text-sm font-medium">Anståndsdatum</th>
            <th className="text-left p-3 text-sm font-medium">Betalstatus</th>
            <th className="w-10"></th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => {
            const isExpanded = expandedInvoice === invoice.invoiceNumber;
            return (
              <>
                <tr 
                  key={invoice.invoiceNumber} 
                  className="border-b hover:bg-muted/30 cursor-pointer"
                  onClick={() => toggleExpand(invoice.invoiceNumber)}
                >
                  <td className="p-3 text-sm">{invoice.invoiceNumber}</td>
                  <td className="p-3 text-sm">{invoice.invoiceDate}</td>
                  <td className="p-3 text-sm">{invoice.dueDate}</td>
                  <td className="p-3 text-sm text-right">{formatCurrency(invoice.amount)}</td>
                  <td className="p-3 text-sm text-right">{formatCurrency(invoice.balance)}</td>
                  <td className="p-3 text-sm">{invoice.invoiceType}</td>
                  <td className="p-3 text-sm">{invoice.inCollection ? 'Ja' : 'Nej'}</td>
                  <td className="p-3 text-sm">{invoice.deferralDate || '–'}</td>
                  <td className="p-3 text-sm">
                    <Badge variant={getStatusVariant(invoice.paymentStatus)}>
                      {getStatusText(invoice)}
                    </Badge>
                  </td>
                  <td className="p-3">
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </td>
                </tr>
                {isExpanded && invoice.lineItems.length > 0 && (
                <tr>
                  <td colSpan={10} className="p-0">
                    <div className="bg-muted/50 border-l-4 border-primary/30 p-4 ml-4 space-y-4">
                      {/* Statisk info */}
                      {((invoice.text && invoice.paymentStatus !== 'Kredit') || 
                        (invoice.relatedInvoiceNumber && (invoice.paymentStatus === 'Krediterad' || invoice.paymentStatus === 'Kredit')) ||
                        (invoice.creditEvents && invoice.creditEvents.length > 0 && invoice.paymentStatus === 'Delkrediterad')) && (
                        <div className="bg-background/50 rounded-lg p-3 space-y-2">
                          {invoice.text && invoice.paymentStatus !== 'Kredit' && (
                            <div className="text-sm">
                              <span className="text-muted-foreground">Text:</span>{' '}
                              <span className="font-medium">{invoice.text}</span>
                            </div>
                          )}
                          {invoice.relatedInvoiceNumber && (invoice.paymentStatus === 'Krediterad' || invoice.paymentStatus === 'Kredit') && (
                            <div className="flex items-center gap-2 text-sm">
                              <Link2 className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">
                                {invoice.paymentStatus === 'Krediterad' ? 'Krediteras av faktura:' : 'Krediterar faktura:'}
                              </span>
                              <span className="font-semibold">{invoice.relatedInvoiceNumber}</span>
                            </div>
                          )}
                          {invoice.creditEvents && invoice.creditEvents.length > 0 && invoice.paymentStatus === 'Delkrediterad' && (
                            <div className="flex items-center gap-2 text-sm">
                              <Link2 className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Delkrediteras av fakturor:</span>
                              <span className="font-semibold">{invoice.creditEvents.map(e => e.relatedInvoiceNumber).join(', ')}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Händelser */}
                      {(invoice.inCollection || 
                        (invoice.preliminaryRefund && invoice.preliminaryRefund > 0 && invoice.paymentStatus !== 'Kredit' && invoice.paymentStatus !== 'Betald') ||
                        invoice.paymentStatus === 'Delvis betald' ||
                        invoice.paymentStatus === 'Betald' ||
                        (invoice.creditEvents && invoice.creditEvents.length > 0) ||
                        (invoice.paymentStatus === 'Kredit' && invoice.creditBookedDate)) && (
                        <div className="space-y-2">
                          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Händelser</div>
                          
                          {invoice.inCollection && invoice.inCollectionDate && (
                            <div className="bg-destructive/10 rounded-lg p-3 border-l-4 border-destructive">
                              <div className="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                  <span className="text-muted-foreground block mb-1">Datum:</span>
                                  <span className="font-semibold">{invoice.inCollectionDate}</span>
                                </div>
                                <div className="col-span-2">
                                  <span className="text-muted-foreground block mb-1">Händelse:</span>
                                  <span className="font-semibold text-destructive">Skickad till inkasso</span>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {invoice.paymentStatus === 'Kredit' && invoice.creditBookedDate && (
                            <div className="bg-priority-medium/10 rounded-lg p-3 border-l-4 border-priority-medium">
                              <div className="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                  <span className="text-muted-foreground block mb-1">Datum:</span>
                                  <span className="font-semibold">{invoice.creditBookedDate}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground block mb-1">Händelse:</span>
                                  <span className="font-semibold">Kreditering bokad</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground block mb-1">Krediterat belopp:</span>
                                  <span className="font-semibold text-priority-medium">{formatCurrency(invoice.amount)}</span>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {invoice.creditEvents && invoice.creditEvents.map((event, index) => (
                            <div key={index} className="bg-priority-medium/10 rounded-lg p-3 border-l-4 border-priority-medium">
                              <div className="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                  <span className="text-muted-foreground block mb-1">Datum:</span>
                                  <span className="font-semibold">{event.date}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground block mb-1">Händelse:</span>
                                  <span className="font-semibold">Delkrediterad</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground block mb-1">Krediterat belopp:</span>
                                  <span className="font-semibold text-priority-medium">{formatCurrency(event.amount)}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                          
                          {invoice.preliminaryRefund && invoice.preliminaryRefund > 0 && invoice.paymentStatus !== 'Kredit' && invoice.paymentStatus !== 'Betald' && (
                            <div className="bg-warning/10 rounded-lg p-3 border-l-4 border-warning">
                              <div className="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                  <span className="text-muted-foreground block mb-1">Planerat datum:</span>
                                  <span className="font-semibold">{invoice.preliminaryRefundDate || '–'}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground block mb-1">Händelse:</span>
                                  <span className="font-semibold">Prel. återbetalning</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground block mb-1">Belopp:</span>
                                  <span className="font-semibold text-warning">{formatCurrency(invoice.preliminaryRefund)}</span>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {invoice.paymentStatus === 'Delvis betald' && invoice.paidAmount !== undefined && (
                            <div className="bg-priority-medium/10 rounded-lg p-3 border-l-4 border-priority-medium">
                              <div className="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                  <span className="text-muted-foreground block mb-1">Datum:</span>
                                  <span className="font-semibold">{invoice.paymentDate || '–'}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground block mb-1">Inbetalt:</span>
                                  <span className="font-semibold">{formatCurrency(invoice.paidAmount)}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground block mb-1">Kvar att betala:</span>
                                  <span className="font-semibold text-priority-medium">{formatCurrency(invoice.amount - invoice.paidAmount)}</span>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {invoice.paymentStatus === 'Betald' && invoice.paymentDate && invoice.paidAmount !== undefined && (
                            <div className="bg-success/5 rounded-lg p-3 border-l-4 border-success">
                              <div className="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                  <span className="text-muted-foreground block mb-1">Datum:</span>
                                  <span className="font-semibold">{invoice.paymentDate}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground block mb-1">Källa:</span>
                                  <span className="font-semibold">{invoice.paymentSource || 'OCR'}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground block mb-1">Inbetalat:</span>
                                  <span className="font-semibold text-success">{formatCurrency(invoice.paidAmount)}</span>
                                </div>
                              </div>
                              {invoice.invoiceType === 'Ströfaktura' && (
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpenPDF(invoice.invoiceNumber);
                                  }}
                                  className="w-full sm:w-auto mt-3"
                                >
                                  <FileText className="h-4 w-4 mr-2" />
                                  Öppna PDF
                                </Button>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Fakturarader */}
                      <div className="bg-background rounded-lg p-3 shadow-sm">
                        <div className="font-medium text-sm mb-3 text-muted-foreground">Fakturarader</div>
                        <table className="w-full">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="text-left p-2 text-xs font-medium">Belopp</th>
                            <th className="text-left p-2 text-xs font-medium">Moms</th>
                            <th className="text-left p-2 text-xs font-medium">Totalt</th>
                            <th className="text-left p-2 text-xs font-medium">Hyresartikel</th>
                            <th className="text-left p-2 text-xs font-medium">Beskrivning</th>
                            <th className="text-left p-2 text-xs font-medium">Utskriftsgrupp</th>
                          </tr>
                        </thead>
                        <tbody>
                          {invoice.lineItems.map((item, idx) => (
                            <tr key={idx} className="border-b last:border-0">
                              <td className="p-2 text-sm">{formatCurrency(item.amount)}</td>
                              <td className="p-2 text-sm">{formatCurrency(item.vat)}</td>
                              <td className="p-2 text-sm">{formatCurrency(item.total)}</td>
                              <td className="p-2 text-sm">{item.rentalArticle}</td>
                              <td className="p-2 text-sm">{item.description}</td>
                              <td className="p-2 text-sm">{item.printGroup}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      </div>
                    </div>
                  </td>
                </tr>
                )}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
