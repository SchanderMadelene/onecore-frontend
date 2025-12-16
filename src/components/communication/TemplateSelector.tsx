import {
  Select,
  SelectContent,
  SelectItem,
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

export function TemplateSelector({ templates, onSelect, type }: TemplateSelectorProps) {
  const handleValueChange = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      onSelect(template);
    }
  };

  return (
    <Select onValueChange={handleValueChange}>
      <SelectTrigger className="w-full">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <SelectValue placeholder="Välj mall..." />
        </div>
      </SelectTrigger>
      <SelectContent className="bg-popover">
        {templates.map((template) => (
          <SelectItem key={template.id} value={template.id}>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-xs">[{template.category}]</span>
              <span>{template.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
