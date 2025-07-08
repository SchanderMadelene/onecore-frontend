import { useState } from "react";
import { Calendar, Filter, Search, User, Clock, ChevronDown, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { getTenantEvents, getEventTypeColor, type TenantEvent } from "@/data/tenant-events";

interface TenantEventLogProps {
  personalNumber: string;
}

export const TenantEventLog = ({ personalNumber }: TenantEventLogProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());

  const allEvents = getTenantEvents(personalNumber);
  
  // Filtrera händelser baserat på sökning och typ
  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = searchQuery === "" || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === "all" || event.type === typeFilter;
    
    return matchesSearch && matchesType;
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

  const getEventTypeName = (type: TenantEvent['type']): string => {
    switch (type) {
      case 'system': return 'System';
      case 'login': return 'Inloggning';
      case 'profile_change': return 'Profiländring';
      case 'contract': return 'Kontrakt';
      case 'payment': return 'Betalning';
      case 'support': return 'Support';
      default: return 'Övrigt';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filtersektion */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Händelselogg
          </CardTitle>
        </CardHeader>
        <CardContent>
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
              </SelectContent>
            </Select>
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
                      <div className="flex items-start gap-4">
                        {/* Tidslinjemarkör */}
                        <div className={`w-3 h-3 rounded-full mt-1 ${getEventTypeColor(event.type)}`}></div>
                        
                        {/* Huvudinnehåll */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-medium text-foreground">{event.title}</h3>
                                <Badge variant="outline" className="text-xs">
                                  {getEventTypeName(event.type)}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{event.description}</p>
                            </div>
                            
                            {/* Tidsstämpel och expanderingsikon */}
                            <div className="flex items-center gap-2 text-sm text-muted-foreground shrink-0">
                              <Clock className="h-4 w-4" />
                              <span>{formatTimestamp(event.timestamp)}</span>
                              {hasMetadata && (
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                  {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                                </Button>
                              )}
                            </div>
                          </div>
                          
                          {/* Användare som utförde åtgärden */}
                          {event.user && (
                            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                              <User className="h-3 w-3" />
                              <span>Utfört av: {event.user}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleTrigger>
                  
                  {/* Expanderat innehåll med metadata */}
                  {hasMetadata && (
                    <CollapsibleContent>
                      <CardContent className="pt-0 pb-4 px-4">
                        <div className="ml-14 pl-4 border-l-2 border-muted">
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium text-foreground">Detaljer</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                              {Object.entries(event.metadata || {}).map(([key, value]) => (
                                <div key={key} className="flex justify-between">
                                  <span className="text-muted-foreground capitalize">{key.replace('_', ' ')}:</span>
                                  <span className="font-mono text-foreground">{String(value)}</span>
                                </div>
                              ))}
                            </div>
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