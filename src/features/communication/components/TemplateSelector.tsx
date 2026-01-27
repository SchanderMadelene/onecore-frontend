import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageTemplate } from "@/types/messageTemplates";
import { FileText } from "lucide-react";

interface TemplateSelectorProps {
  templates: MessageTemplate[];
  onSelect: (template: MessageTemplate) => void;
  type: "sms" | "email";
}

function groupByCategory(templates: MessageTemplate[]) {
  const map = new Map<string, MessageTemplate[]>();
  for (const t of templates) {
    map.set(t.category, [...(map.get(t.category) ?? []), t]);
  }
  return Array.from(map.entries());
}

export function TemplateSelector({ templates, onSelect }: TemplateSelectorProps) {
  const handleValueChange = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) onSelect(template);
  };

  const grouped = groupByCategory(templates);

  return (
    <Select onValueChange={handleValueChange}>
      <SelectTrigger className="w-full">
        <span className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <SelectValue placeholder="Välj mall..." />
        </span>
      </SelectTrigger>

      <SelectContent>
        {grouped.map(([category, items]) => (
          <SelectGroup key={category}>
            <SelectLabel>{category}</SelectLabel>
            {items.map((template) => (
              <SelectItem key={template.id} value={template.id}>
                {template.name}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}


