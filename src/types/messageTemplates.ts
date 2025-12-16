export interface MessageTemplate {
  id: string;
  name: string;
  category: string;
  smsContent: string;
  emailSubject: string;
  emailContent: string;
}

export type TemplateCategory = "Driftstörningar" | "Planerat underhåll" | "Påminnelser" | "Information";
