import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ColumnConfig {
  width?: string;
  align?: "left" | "center" | "right";
}

interface TableLoadingStateProps {
  /** Number of skeleton rows to display */
  rows?: number;
  /** Column configurations - can be number of columns or array with width configs */
  columns: number | ColumnConfig[];
  /** Optional column headers */
  headers?: string[];
  /** Show table header */
  showHeader?: boolean;
}

export const TableLoadingState = ({
  rows = 5,
  columns,
  headers,
  showHeader = true,
}: TableLoadingStateProps) => {
  const columnCount = typeof columns === "number" ? columns : columns.length;
  const columnConfigs: ColumnConfig[] =
    typeof columns === "number"
      ? Array(columns).fill({ width: "auto", align: "left" })
      : columns;

  return (
    <div className="rounded-md border">
      <Table>
        {showHeader && (
          <TableHeader>
            <TableRow>
              {Array.from({ length: columnCount }).map((_, colIndex) => (
                <TableHead
                  key={colIndex}
                  className={
                    columnConfigs[colIndex]?.align === "right"
                      ? "text-right"
                      : columnConfigs[colIndex]?.align === "center"
                      ? "text-center"
                      : ""
                  }
                  style={{ width: columnConfigs[colIndex]?.width }}
                >
                  {headers?.[colIndex] ?? <Skeleton className="h-4 w-20" />}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
        )}
        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: columnCount }).map((_, colIndex) => (
                <TableCell
                  key={colIndex}
                  className={
                    columnConfigs[colIndex]?.align === "right"
                      ? "text-right"
                      : columnConfigs[colIndex]?.align === "center"
                      ? "text-center"
                      : ""
                  }
                >
                  <Skeleton
                    className={`h-4 ${
                      colIndex === 0 ? "w-32" : colIndex === columnCount - 1 ? "w-16" : "w-24"
                    }`}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
