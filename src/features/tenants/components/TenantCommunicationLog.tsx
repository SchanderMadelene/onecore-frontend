import { Badge } from "@/components/ui/badge";
import { MessageSquare, Mail, Inbox } from "lucide-react";
import { getRecentMessages } from "../data/communication-log";
import { CollapsibleInfoCard } from "@/shared/ui/collapsible-info-card";

interface TenantCommunicationLogProps {
  personalNumber: string;
}

export function TenantCommunicationLog({ personalNumber }: TenantCommunicationLogProps) {
  const messages = getRecentMessages(personalNumber);

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' }) +
      ' ' + d.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' });
  };

  const emptyState = (
    <p className="text-sm text-muted-foreground flex items-center gap-2 py-1">
      <Inbox className="h-4 w-4" />
      Inga meddelanden skickade senaste 48 timmarna
    </p>
  );

  return (
    <CollapsibleInfoCard
      title="Skickade meddelanden (senaste 48h)"
      titleClassName="text-sm font-medium text-muted-foreground"
    >
      {messages.length === 0 ? emptyState : (
        <div className="space-y-3 sm:space-y-2">
          {messages.map((msg, i) => (
            <div
              key={msg.id}
              className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm py-1.5 ${i < messages.length - 1 ? 'sm:border-b sm:border-border' : ''}`}
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
          ))}
        </div>
      )}
    </CollapsibleInfoCard>
  );
}
