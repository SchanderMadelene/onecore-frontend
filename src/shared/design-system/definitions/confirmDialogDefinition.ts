import { ComponentDefinition } from "../viewer/types";
import { ConfirmDialog } from "@/shared/common";

export const confirmDialogDefinition: ComponentDefinition = {
  name: "ConfirmDialog",
  description: "Bekräftelsedialog för destruktiva eller viktiga åtgärder. Wrappar AlertDialog med standardiserade props.",
  component: ConfirmDialog,
  props: [
    {
      name: "open",
      type: "boolean",
      controlType: "boolean",
      defaultValue: true,
      description: "Om dialogen är öppen.",
      required: true,
    },
    {
      name: "title",
      type: "string",
      controlType: "text",
      defaultValue: "Bekräfta åtgärd",
      description: "Dialogens rubrik.",
      required: true,
    },
    {
      name: "description",
      type: "ReactNode",
      controlType: "text",
      defaultValue: "Är du säker på att du vill fortsätta?",
      description: "Beskrivning av åtgärden.",
      required: true,
    },
    {
      name: "confirmLabel",
      type: "string",
      controlType: "text",
      defaultValue: "Bekräfta",
      description: "Text på bekräftaknappen.",
    },
    {
      name: "cancelLabel",
      type: "string",
      controlType: "text",
      defaultValue: "Avbryt",
      description: "Text på avbrytknappen.",
    },
    {
      name: "variant",
      type: '"default" | "destructive"',
      controlType: "select",
      options: ["default", "destructive"],
      defaultValue: "default",
      description: "Visuell variant. Destructive ger röd bekräftaknapp.",
    },
    {
      name: "isPending",
      type: "boolean",
      controlType: "boolean",
      defaultValue: false,
      description: "Visar laddningstext och inaktiverar knappar.",
    },
    {
      name: "pendingLabel",
      type: "string",
      controlType: "text",
      defaultValue: "Bekräftar...",
      description: "Text som visas på bekräftaknappen vid isPending.",
    },
  ],
  defaultCode: `<ConfirmDialog
  open={true}
  onOpenChange={() => {}}
  title="Radera objekt"
  description="Är du säker? Denna åtgärd kan inte ångras."
  onConfirm={() => console.log('confirmed')}
  confirmLabel="Radera"
  variant="destructive"
/>`,
};
