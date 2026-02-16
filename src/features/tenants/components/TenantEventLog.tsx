import { useState } from "react";
import { Calendar, Filter, Search, User, Clock, ChevronDown, ChevronRight, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { getTenantEvents, type TenantEvent } from "@/features/tenants/data/tenant-events";

interface TenantEventLogProps {
  personalNumber: string;
}

export const TenantEventLog = ({ personalNumber }: TenantEventLogProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());

  const allEvents = getTenantEvents(personalNumber);
  
  // Filtrera händelser baserat på sökning, typ och datum
  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = searchQuery === "" || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === "all" || event.type === typeFilter;
    
    // Datumfiltrering
    const eventDate = new Date(event.timestamp);
    const matchesDateFrom = !dateFrom || eventDate >= dateFrom;
    const matchesDateTo = !dateTo || eventDate <= dateTo;
    
    return matchesSearch && matchesType && matchesDateFrom && matchesDateTo;
  });

  const toggleEventExpansion = (eventId: string) => {
    setExpandedEvents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  };

  const formatTimestamp = (timestamp: string): string => {
    return new Date(timestamp).toLocaleString('sv-SE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatMetadataKey = (key: string): string => {
    const keyMap: Record<string, string> = {
      messageType: 'Typ',
      messagePreview: 'Meddelande',
      recipient: 'Mottagare',
      subject: 'Ämne',
      sentBy: 'Skickat av',
      caseId: 'Ärendenr',
      priority: 'Prioritet',
      resolution: 'Lösning',
      amount: 'Belopp',
      period: 'Period',
      field: 'Fält',
      oldValue: 'Tidigare värde',
      newValue: 'Nytt värde',
      ip: 'IP-adress',
      device: 'Enhet',
      channel: 'Kanal',
      newEndDate: 'Nytt slutdatum',
      previousEndDate: 'Tidigare slutdatum',
    };
    return keyMap[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
  };

  const getEventTypeName = (type: TenantEvent['type']): string => {
    switch (type) {
      case 'system': return 'System';
      case 'login': return 'Inloggning';
      case 'profile_change': return 'Profiländring';
      case 'contract': return 'Kontrakt';
      case 'payment': return 'Betalning';
      case 'support': return 'Support';
      case 'communication': return 'Kommunikation';
      default: return 'Övrigt';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filtersektion */}
      <Card>
        <CardHeader>
          <CardTitle>Händelselogg</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {/* Första raden med sökning och typfilter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Sök i händelser..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filtrera typ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alla typer</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="login">Inloggning</SelectItem>
                  <SelectItem value="profile_change">Profiländring</SelectItem>
                  <SelectItem value="contract">Kontrakt</SelectItem>
                  <SelectItem value="payment">Betalning</SelectItem>
                  <SelectItem value="support">Support</SelectItem>
                  <SelectItem value="communication">Kommunikation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Andra raden med datumfilter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Från datum</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateFrom && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateFrom ? format(dateFrom, "PPP") : <span>Välj startdatum</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={dateFrom}
                      onSelect={setDateFrom}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Till datum</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateTo && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateTo ? format(dateTo, "PPP") : <span>Välj slutdatum</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={dateTo}
                      onSelect={setDateTo}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Rensa datumfilter */}
              {(dateFrom || dateTo) && (
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setDateFrom(undefined);
                      setDateTo(undefined);
                    }}
                    className="h-10"
                  >
                    Rensa datum
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {filteredEvents.length > 0 && (
            <div className="mt-4 text-sm text-muted-foreground">
              Visar {filteredEvents.length} av {allEvents.length} händelser
            </div>
          )}
        </CardContent>
      </Card>

      {/* Händelselista */}
      <div className="space-y-3">
        {filteredEvents.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">Inga händelser hittades med de valda filtren.</p>
            </CardContent>
          </Card>
        ) : (
          filteredEvents.map((event) => {
            const isExpanded = expandedEvents.has(event.id);
            const hasMetadata = event.metadata && Object.keys(event.metadata).length > 0;
            
            return (
              <Collapsible key={event.id} open={isExpanded} onOpenChange={() => toggleEventExpansion(event.id)}>
                <Card className="transition-all duration-200 hover:shadow-sm">
                  <CollapsibleTrigger asChild>
                    <CardContent className="p-4 cursor-pointer">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h3 className="font-medium text-foreground">{event.title}</h3>
                              <Badge variant="outline" className={`text-xs ${
                                event.type === 'communication' && event.metadata?.messageType === 'sms'
                                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                                  : event.type === 'communication' && event.metadata?.messageType === 'email'
                                  ? 'bg-purple-50 text-purple-700 border-purple-200'
                                  : ''
                              }`}>
                                {getEventTypeName(event.type)}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground break-words">{event.description}</p>
                          </div>
                          
                          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground shrink-0">
                            <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span>{formatTimestamp(event.timestamp)}</span>
                            {hasMetadata && (
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                              </Button>
                            )}
                          </div>
                        </div>
                        
                        {event.user && (
                          <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                            <User className="h-3 w-3" />
                            <span>Utfört av: {event.user}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </CollapsibleTrigger>
                  
                  {/* Expanderat innehåll med metadata */}
                  {hasMetadata && (
                    <CollapsibleContent>
                      <CardContent className="pt-0 pb-4 px-4">
                        <div className="pl-4 border-l-2 border-muted">
                          <h4 className="text-xs font-medium text-muted-foreground mb-2">Detaljer</h4>
                          <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs">
                            {Object.entries(event.metadata || {}).map(([key, value]) => (
                              <div key={key} className="flex gap-1.5">
                                <span className="text-muted-foreground whitespace-nowrap">{formatMetadataKey(key)}:</span>
                                <span className="text-foreground">{String(value)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  )}
                </Card>
              </Collapsible>
            );
          })
        )}
      </div>
    </div>
  );
};
