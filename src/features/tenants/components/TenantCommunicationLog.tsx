
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { MessageSquare, Mail, Inbox, ChevronDown, ChevronUp } from "lucide-react";
import { getRecentMessages } from "../data/communication-log";
import { useIsMobile } from "@/hooks/use-mobile";

interface TenantCommunicationLogProps {
  personalNumber: string;
}

export function TenantCommunicationLog({ personalNumber }: TenantCommunicationLogProps) {
  const messages = getRecentMessages(personalNumber);
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(!isMobile);

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' }) +
      ' ' + d.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' });
  };

  const messageList = (
    <div className="space-y-3">
      {messages.length === 0 ? (
        <p className="text-sm text-muted-foreground flex items-center gap-2 py-1">
          <Inbox className="h-4 w-4" />
          Inga meddelanden skickade senaste 48 timmarna
        </p>
      ) : (
        messages.map((msg) => (
          <div key={msg.id} className="space-y-0.5">
            <Badge
              variant="outline"
              className={`text-xs w-fit flex items-center gap-1 ${
                msg.type === 'sms'
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'bg-purple-50 text-purple-700 border-purple-200'
              }`}
            >
              {msg.type === 'sms' ? <MessageSquare className="h-3 w-3" /> : <Mail className="h-3 w-3" />}
              {msg.type === 'sms' ? 'SMS' : 'E-post'}
            </Badge>
            <p className="text-sm text-muted-foreground">till {msg.recipient}</p>
            <p className="text-xs text-muted-foreground">{formatTime(msg.sentAt)}</p>
            <p className="text-sm text-foreground">
              "{msg.messagePreview.length > 50 ? msg.messagePreview.slice(0, 50) + '...' : msg.messagePreview}"
            </p>
          </div>
        ))
      )}
    </div>
  );

  if (isMobile) {
    return (
      <Card>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <div className="w-full cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Skickade meddelanden (senaste 48h)
                  </CardTitle>
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </CardHeader>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              {messageList}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Skickade meddelanden (senaste 48h)
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0">
        <div className="space-y-2">
          {messages.length === 0 ? (
            <p className="text-sm text-muted-foreground flex items-center gap-2 py-1">
              <Inbox className="h-4 w-4" />
              Inga meddelanden skickade senaste 48 timmarna
            </p>
          ) : (
            messages.map((msg, i) => (
              <div
                key={msg.id}
                className={`flex items-center gap-3 text-sm py-1.5 ${i < messages.length - 1 ? 'border-b border-border' : ''}`}
              >
                <Badge
                  variant="outline"
                  className={`text-xs w-fit flex items-center gap-1 shrink-0 ${
                    msg.type === 'sms'
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-purple-50 text-purple-700 border-purple-200'
                  }`}
                >
                  {msg.type === 'sms' ? <MessageSquare className="h-3 w-3" /> : <Mail className="h-3 w-3" />}
                  {msg.type === 'sms' ? 'SMS' : 'E-post'}
                </Badge>
                <span className="text-muted-foreground shrink-0">till {msg.recipient}</span>
                <span className="text-muted-foreground text-xs shrink-0">{formatTime(msg.sentAt)}</span>
                <span className="text-foreground truncate" title={msg.messagePreview}>
                  "{msg.messagePreview.length > 50 ? msg.messagePreview.slice(0, 50) + '...' : msg.messagePreview}"
                </span>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
