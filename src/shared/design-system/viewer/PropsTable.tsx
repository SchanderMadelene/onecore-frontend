import { PropDefinition } from "./types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface PropsTableProps {
  props: PropDefinition[];
}

export const PropsTable = ({ props }: PropsTableProps) => {
  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xs">Prop</TableHead>
            <TableHead className="text-xs">Typ</TableHead>
            <TableHead className="text-xs">Default</TableHead>
            <TableHead className="text-xs">Required</TableHead>
            <TableHead className="text-xs">Beskrivning</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.map((prop) => (
            <TableRow key={prop.name}>
              <TableCell className="font-mono text-xs font-medium">{prop.name}</TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground">{prop.type}</TableCell>
              <TableCell className="font-mono text-xs">{prop.defaultValue != null ? String(prop.defaultValue) : "—"}</TableCell>
              <TableCell>
                {prop.required ? (
                  <Badge variant="destructive" className="text-[10px]">Ja</Badge>
                ) : (
                  <span className="text-xs text-muted-foreground">Nej</span>
                )}
              </TableCell>
              <TableCell className="text-xs text-muted-foreground">{prop.description ?? "—"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
