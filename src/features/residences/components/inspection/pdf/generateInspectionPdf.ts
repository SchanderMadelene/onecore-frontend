import jsPDF from 'jspdf';
import { format } from 'date-fns';
import type { Inspection } from '../types';
import type { PdfOptions, CostItem } from './types';
import { extractCostItems, getTenantCostItems } from './types';

const MARGIN = 20;
const PAGE_WIDTH = 210; // A4
const CONTENT_WIDTH = PAGE_WIDTH - 2 * MARGIN;
const LINE_HEIGHT = 7;

/**
 * Genererar ett besiktningsprotokoll som PDF
 */
export function generateInspectionPdf(options: PdfOptions): jsPDF {
  const { inspection, recipient, roomNames } = options;
  const doc = new jsPDF();
  
  let yPos = MARGIN;

  // Helper för att lägga till ny sida vid behov
  const checkPageBreak = (neededSpace: number) => {
    if (yPos + neededSpace > 280) {
      doc.addPage();
      yPos = MARGIN;
    }
  };

  // Header
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Besiktningsprotokoll', MARGIN, yPos);
  yPos += 10;

  // Recipient type badge
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const recipientText = recipient === 'outgoing' ? 'Avflyttande hyresgäst' : 'Inflyttande hyresgäst';
  doc.text(recipientText, MARGIN, yPos);
  yPos += 15;

  // Besiktningsinfo
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Besiktningsinformation', MARGIN, yPos);
  yPos += LINE_HEIGHT;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  const infoLines = [
    `Besiktningsnummer: ${inspection.inspectionNumber || '-'}`,
    `Datum: ${format(new Date(inspection.date), 'yyyy-MM-dd HH:mm')}`,
    `Besiktigad av: ${inspection.inspectedBy}`,
    `Status: ${inspection.status === 'completed' ? 'Slutförd' : inspection.status === 'draft' ? 'Utkast' : 'Pågående'}`,
    `Huvudnyckel behövs: ${inspection.needsMasterKey ? 'Ja' : 'Nej'}`,
  ];

  infoLines.forEach(line => {
    doc.text(line, MARGIN, yPos);
    yPos += LINE_HEIGHT;
  });
  yPos += 5;

  // Objektinfo
  checkPageBreak(40);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Objekt', MARGIN, yPos);
  yPos += LINE_HEIGHT;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');

  if (inspection.residence) {
    const residenceLines = [
      `Objektnummer: ${inspection.residence.objectNumber || '-'}`,
      `Adress: ${inspection.residence.address || '-'}`,
    ];
    if (inspection.residence.apartmentType) {
      residenceLines.push(`Lägenhetstyp: ${inspection.residence.apartmentType}`);
    }
    if (inspection.residence.size) {
      residenceLines.push(`Storlek: ${inspection.residence.size} kvm`);
    }

    residenceLines.forEach(line => {
      doc.text(line, MARGIN, yPos);
      yPos += LINE_HEIGHT;
    });
  }
  yPos += 5;

  // Hyresgästinfo
  if (inspection.tenant) {
    checkPageBreak(30);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Hyresgäst', MARGIN, yPos);
    yPos += LINE_HEIGHT;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    const tenantLines = [
      `Namn: ${inspection.tenant.name || '-'}`,
      `Personnummer: ${inspection.tenant.personalNumber || '-'}`,
    ];
    if (inspection.tenant.phone) {
      tenantLines.push(`Telefon: ${inspection.tenant.phone}`);
    }
    if (inspection.tenant.email) {
      tenantLines.push(`E-post: ${inspection.tenant.email}`);
    }

    tenantLines.forEach(line => {
      doc.text(line, MARGIN, yPos);
      yPos += LINE_HEIGHT;
    });
    yPos += 5;
  }

  // Rum-genomgång
  checkPageBreak(20);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Rumsbesiktning', MARGIN, yPos);
  yPos += LINE_HEIGHT + 3;

  Object.entries(inspection.rooms).forEach(([roomId, room]) => {
    checkPageBreak(50);
    
    const roomName = roomNames?.[roomId] || `Rum ${roomId}`;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(roomName, MARGIN, yPos);
    yPos += LINE_HEIGHT;

    const components = ['wall1', 'wall2', 'wall3', 'wall4', 'floor', 'ceiling', 'details'] as const;
    const componentLabels: Record<string, string> = {
      wall1: 'Vägg 1',
      wall2: 'Vägg 2',
      wall3: 'Vägg 3',
      wall4: 'Vägg 4',
      floor: 'Golv',
      ceiling: 'Tak',
      details: 'Detaljer',
    };

    components.forEach(component => {
      const condition = room.conditions?.[component];
      const actions = room.actions?.[component] || [];
      const note = room.componentNotes?.[component];
      const responsibility = room.costResponsibility?.[component];

      // Visa endast om det finns någon data
      if (condition || actions.length > 0 || note) {
        checkPageBreak(25);
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text(`  ${componentLabels[component]}:`, MARGIN, yPos);
        yPos += LINE_HEIGHT;

        doc.setFont('helvetica', 'normal');
        if (condition) {
          doc.text(`    Skick: ${condition}`, MARGIN, yPos);
          yPos += LINE_HEIGHT;
        }

        if (actions.length > 0) {
          doc.text(`    Åtgärder: ${actions.join(', ')}`, MARGIN, yPos);
          yPos += LINE_HEIGHT;
        }

        // Visa kostnadsansvar endast för avflyttande
        if (recipient === 'outgoing' && responsibility) {
          const respText = responsibility === 'tenant' ? 'Hyresgästens ansvar' : 'Hyresvärdens ansvar';
          doc.text(`    Kostnadsansvar: ${respText}`, MARGIN, yPos);
          yPos += LINE_HEIGHT;
        }

        if (note) {
          const noteLines = doc.splitTextToSize(`    Anteckning: ${note}`, CONTENT_WIDTH - 10);
          noteLines.forEach((line: string) => {
            checkPageBreak(LINE_HEIGHT);
            doc.text(line, MARGIN, yPos);
            yPos += LINE_HEIGHT;
          });
        }
      }
    });

    yPos += 5;
  });

  // Kostnadssammanställning (endast för avflyttande)
  if (recipient === 'outgoing') {
    const allCostItems = extractCostItems(inspection, roomNames);

    if (allCostItems.length > 0) {
      checkPageBreak(40);
      yPos += 10;
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Kostnadssammanställning', MARGIN, yPos);
      yPos += LINE_HEIGHT + 3;

      doc.setFontSize(10);
      allCostItems.forEach((item, index) => {
        checkPageBreak(25);
        
        doc.setFont('helvetica', 'bold');
        doc.text(`${index + 1}. ${item.roomName} - ${item.componentLabel}`, MARGIN, yPos);
        yPos += LINE_HEIGHT;

        doc.setFont('helvetica', 'normal');
        if (item.condition) {
          doc.text(`   Skick: ${item.condition}`, MARGIN, yPos);
          yPos += LINE_HEIGHT;
        }
        if (item.actions.length > 0) {
          doc.text(`   Åtgärder: ${item.actions.join(', ')}`, MARGIN, yPos);
          yPos += LINE_HEIGHT;
        }
        
        // Visa kostnadsansvar
        const respText = item.responsibility === 'tenant' ? 'Hyresgästens ansvar' : 'Hyresvärdens ansvar';
        doc.text(`   Ansvar: ${respText}`, MARGIN, yPos);
        yPos += LINE_HEIGHT;
        
        yPos += 3;
      });
    }
  }

  // Footer
  checkPageBreak(30);
  yPos += 15;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.text(`Genererad: ${format(new Date(), 'yyyy-MM-dd HH:mm')}`, MARGIN, yPos);

  return doc;
}

/**
 * Genererar och laddar ner PDF
 */
export function downloadInspectionPdf(options: PdfOptions): void {
  const doc = generateInspectionPdf(options);
  const filename = `besiktning-${options.inspection.inspectionNumber || 'protokoll'}-${options.recipient}.pdf`;
  doc.save(filename);
}
