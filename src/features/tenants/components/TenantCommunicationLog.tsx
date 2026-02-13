
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Mail, Inbox } from "lucide-react";
import { getRecentMessages } from "../data/communication-log";
import { useIsMobile } from "@/hooks/use-mobile";

interface TenantCommunicationLogProps {
  personalNumber: string;
}

export function TenantCommunicationLog({ personalNumber }: TenantCommunicationLogProps) {
  const messages = getRecentMessages(personalNumber);
  const isMobile = useIsMobile();

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' }) +
      ' ' + d.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card>
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Skickade meddelanden (senaste 48h)
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0">
        {messages.length === 0 ? (
          <p className="text-sm text-muted-foreground flex items-center gap-2 py-1">
            <Inbox className="h-4 w-4" />
            Inga meddelanden skickade senaste 48 timmarna
          </p>
        ) : (
          <div className="space-y-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${isMobile ? 'flex-col gap-1' : 'items-center gap-3'} text-sm py-1.5 ${messages.indexOf(msg) < messages.length - 1 ? 'border-b border-border' : ''}`}
              >
                <Badge
                  variant="outline"
                  className={`text-xs w-fit flex items-center gap-1 ${
                    msg.type === 'sms'
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-purple-50 text-purple-700 border-purple-200'
                  }`}
                >
                  {msg.type === 'sms' ? (
                    <MessageSquare className="h-3 w-3" />
                  ) : (
                    <Mail className="h-3 w-3" />
                  )}
                  {msg.type === 'sms' ? 'SMS' : 'E-post'}
                </Badge>

                <span className="text-muted-foreground">
                  till {msg.recipient}
                </span>

                <span className="text-muted-foreground text-xs">
                  {formatTime(msg.sentAt)}
                </span>

                <span className="text-foreground truncate max-w-xs" title={msg.messagePreview}>
                  "{msg.messagePreview.length > 50 ? msg.messagePreview.slice(0, 50) + '...' : msg.messagePreview}"
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
