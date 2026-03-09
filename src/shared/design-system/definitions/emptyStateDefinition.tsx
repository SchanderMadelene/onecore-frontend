import { Search, FileX, Inbox, AlertCircle } from "lucide-react";
import { EmptyState } from "@/shared/ui/empty-state";
import { ComponentDefinition } from "../viewer/types";

const iconMap: Record<string, any> = {
  Search,
  FileX,
  Inbox,
  AlertCircle,
};

const EmptyStateWrapper = ({ icon, ...props }: { icon: string; title: string; description?: string }) => {
  const IconComponent = iconMap[icon] || Search;
  return <EmptyState icon={IconComponent} {...props} />;
};

export const emptyStateDefinition: ComponentDefinition = {
  name: "EmptyState",
  description: "Standardiserad tom-vy med ikon, titel och valfri beskrivning. Används när data saknas.",
  component: EmptyStateWrapper,
  props: [
    {
      name: "icon",
      type: "LucideIcon",
      controlType: "select",
      options: ["Search", "FileX", "Inbox", "AlertCircle"],
      defaultValue: "Search",
      description: "Lucide-ikon som visas centrerat.",
    },
    {
      name: "title",
      type: "string",
      controlType: "text",
      defaultValue: "Inga resultat hittades",
      description: "Rubrik under ikonen.",
      required: true,
    },
    {
      name: "description",
      type: "string",
      controlType: "text",
      defaultValue: "Försök med andra sökkriterier.",
      description: "Valfri beskrivande text.",
    },
  ],
  defaultCode: '<EmptyState icon={Search} title="Inga resultat" description="Försök med andra sökkriterier." />',
};
