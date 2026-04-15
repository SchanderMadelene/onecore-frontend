export interface Order {
  id: string;
  title: string;
  reportedDate: string;
  status: string;
  priority: string;
  description: string;
  assignedTo: string;
  resolvedDate?: string;
  category?: string;
  roomId?: string;
  needsMasterKey?: boolean;
  plannedExecutionDate?: string;
  dueDate?: string;
  entranceId?: string;
  residenceId?: string;
  type?: "Odoo" | "Xpand";
}
