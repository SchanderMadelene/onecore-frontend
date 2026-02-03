import { PropDefinition } from "./types";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface PropsTableProps {
  props: PropDefinition[];
  className?: string;
}

export const PropsTable = ({ props, className }: PropsTableProps) => {
  if (props.length === 0) {
    return (
      <div className="text-sm text-muted-foreground py-4 text-center">
        Inga props definierade för denna komponent.
      </div>
    );
  }

  return (
    <div className={cn("rounded-lg border overflow-hidden", className)}>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Prop</TableHead>
            <TableHead className="font-semibold">Typ</TableHead>
            <TableHead className="font-semibold">Default</TableHead>
            <TableHead className="font-semibold hidden sm:table-cell">Beskrivning</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.map((prop) => (
            <TableRow key={prop.name}>
              <TableCell className="font-mono text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-primary">{prop.name}</span>
                  {prop.required && (
                    <Badge variant="destructive" className="text-[10px] px-1 py-0">
                      Required
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <code className="text-xs bg-muted px-1.5 py-0.5 rounded text-muted-foreground">
                  {prop.type}
                </code>
              </TableCell>
              <TableCell>
                {prop.default ? (
                  <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                    {prop.default}
                  </code>
                ) : (
                  <span className="text-muted-foreground text-xs">—</span>
                )}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground hidden sm:table-cell">
                {prop.description}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
