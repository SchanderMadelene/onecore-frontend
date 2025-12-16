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
      <SelectContent>
        {templates.map((template) => (
          <SelectItem key={template.id} value={template.id}>
            <span className="text-muted-foreground text-xs mr-2">{template.category}:</span>
            {template.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
