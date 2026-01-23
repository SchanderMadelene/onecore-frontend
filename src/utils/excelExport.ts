import * as XLSX from 'xlsx';

export interface ExcelColumn<T> {
  key: keyof T | string;
  header: string;
  getValue?: (item: T) => string | number | boolean | null | undefined;
}

export interface ExportOptions {
  filename: string;
  sheetName?: string;
}

/**
 * Exporterar data till en Excel-fil (.xlsx)
 * 
 * @param data - Array av objekt att exportera
 * @param columns - Kolumndefinitioner med header och getValue-funktion
 * @param options - Filnamn och arknamn
 */
export function exportToExcel<T>(
  data: T[],
  columns: ExcelColumn<T>[],
  options: ExportOptions
): void {
  // Skapa header-rad
  const headers = columns.map(col => col.header);
  
  // Skapa datarader
  const rows = data.map(item => 
    columns.map(col => {
      if (col.getValue) {
        return col.getValue(item);
      }
      const key = col.key as keyof T;
      const value = item[key];
      return value !== undefined && value !== null ? String(value) : '';
    })
  );

  // Kombinera header och data
  const worksheetData = [headers, ...rows];

  // Skapa workbook och worksheet
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

  // Justera kolumnbredder automatiskt
  const columnWidths = columns.map((col, index) => {
    const maxLength = Math.max(
      col.header.length,
      ...rows.map(row => String(row[index] || '').length)
    );
    return { wch: Math.min(maxLength + 2, 50) };
  });
  worksheet['!cols'] = columnWidths;

  // Lägg till worksheet i workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, options.sheetName || 'Data');

  // Ladda ner filen
  const filename = options.filename.endsWith('.xlsx') 
    ? options.filename 
    : `${options.filename}.xlsx`;
  
  XLSX.writeFile(workbook, filename);
}

/**
 * Formaterar datum för Excel-export
 */
export function formatDateForExcel(date: Date | string | undefined | null): string {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('sv-SE');
}

/**
 * Formaterar boolean för Excel-export
 */
export function formatBooleanForExcel(value: boolean | undefined | null): string {
  if (value === undefined || value === null) return '';
  return value ? 'Ja' : 'Nej';
}
