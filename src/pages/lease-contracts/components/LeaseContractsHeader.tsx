import { FileText } from "lucide-react";

export function LeaseContractsHeader() {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg bg-primary/10">
        <FileText className="h-6 w-6 text-primary" />
      </div>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Hyreskontrakt</h1>
        <p className="text-muted-foreground">Hantera och sök bland alla hyreskontrakt</p>
      </div>
    </div>
  );
}
