import { InspectionReadOnly } from "@/features/residences/components/inspection/InspectionReadOnly";
import type { Inspection } from "@/features/residences/components/inspection/types";

// Mockdata med anmärkningar och kostnadsansvar
const mockInspectionWithRemarks: Inspection = {
  id: "insp-demo-001",
  inspectionNumber: "B-2024-047",
  date: new Date().toISOString(),
  inspectedBy: "Anna Johansson",
  status: "completed",
  needsMasterKey: false,
  residence: {
    id: "res-001",
    objectNumber: "LGH-3204",
    address: "Stallgatan 14B, lgh 1102",
    apartmentType: "3 rum och kök",
    size: 78,
  },
  tenant: {
    name: "Erik Svensson",
    personalNumber: "19850101-1234",
    phone: "070-123 45 67",
    email: "erik.svensson@example.com",
  },
  rooms: {
    kitchen: {
      roomId: "kitchen",
      conditions: {
        wall1: "Bra",
        wall2: "Skadad",
        wall3: "Bra",
        wall4: "Acceptabel",
        floor: "Acceptabel",
        ceiling: "Bra",
        details: "Skadad",
      },
      actions: {
        wall1: [],
        wall2: ["Målning", "Spackling"],
        wall3: [],
        wall4: ["Mindre reparation"],
        floor: ["Slipning"],
        ceiling: [],
        details: ["Byte av köksluckor", "Justering av gångjärn"],
      },
      componentNotes: {
        wall1: "",
        wall2: "Stora sprickor vid fönster, troligen fuktskada. Behöver åtgärdas innan nästa hyresgäst.",
        wall3: "",
        wall4: "",
        floor: "Repor vid diskbänk, troligen från tunga möbler.",
        ceiling: "",
        details: "Två köksluckor har lossnat och behöver bytas. Flera gångjärn sitter löst.",
      },
      componentPhotos: {
        wall1: [],
        wall2: [],
        wall3: [],
        wall4: [],
        floor: [],
        ceiling: [],
        details: [],
      },
      costResponsibility: {
        wall1: null,
        wall2: "tenant",
        wall3: null,
        wall4: "landlord",
        floor: "tenant",
        ceiling: null,
        details: "tenant",
      },
      photos: [],
      isApproved: true,
      isHandled: true,
    },
    livingRoom: {
      roomId: "livingRoom",
      conditions: {
        wall1: "Bra",
        wall2: "Bra",
        wall3: "Skadad",
        wall4: "Bra",
        floor: "Skadad",
        ceiling: "Bra",
        details: "Bra",
      },
      actions: {
        wall1: [],
        wall2: [],
        wall3: ["Målning"],
        wall4: [],
        floor: ["Byte av parkettbrädor"],
        ceiling: [],
        details: [],
      },
      componentNotes: {
        wall1: "",
        wall2: "",
        wall3: "Hål efter upphängning som inte lagats korrekt.",
        wall4: "",
        floor: "Vattenskada vid balkongdörr. Tre brädor behöver bytas.",
        ceiling: "",
        details: "",
      },
      componentPhotos: {
        wall1: [],
        wall2: [],
        wall3: [],
        wall4: [],
        floor: [],
        ceiling: [],
        details: [],
      },
      costResponsibility: {
        wall1: null,
        wall2: null,
        wall3: "tenant",
        wall4: null,
        floor: "landlord",
        ceiling: null,
        details: null,
      },
      photos: [],
      isApproved: true,
      isHandled: true,
    },
    bedroom: {
      roomId: "bedroom",
      conditions: {
        wall1: "Bra",
        wall2: "Bra",
        wall3: "Bra",
        wall4: "Bra",
        floor: "Bra",
        ceiling: "Bra",
        details: "Acceptabel",
      },
      actions: {
        wall1: [],
        wall2: [],
        wall3: [],
        wall4: [],
        floor: [],
        ceiling: [],
        details: ["Justering av garderobsdörrar"],
      },
      componentNotes: {
        wall1: "",
        wall2: "",
        wall3: "",
        wall4: "",
        floor: "",
        ceiling: "",
        details: "Garderobsdörrarna hänger snett och går inte att stänga ordentligt.",
      },
      componentPhotos: {
        wall1: [],
        wall2: [],
        wall3: [],
        wall4: [],
        floor: [],
        ceiling: [],
        details: [],
      },
      costResponsibility: {
        wall1: null,
        wall2: null,
        wall3: null,
        wall4: null,
        floor: null,
        ceiling: null,
        details: "landlord",
      },
      photos: [],
      isApproved: true,
      isHandled: true,
    },
    bathroom: {
      roomId: "bathroom",
      conditions: {
        wall1: "Acceptabel",
        wall2: "Skadad",
        wall3: "Bra",
        wall4: "Bra",
        floor: "Bra",
        ceiling: "Acceptabel",
        details: "Skadad",
      },
      actions: {
        wall1: ["Fogning"],
        wall2: ["Byte av kakel", "Fogning"],
        wall3: [],
        wall4: [],
        floor: [],
        ceiling: ["Målning"],
        details: ["Byte av duschblandare", "Tätning runt handfat"],
      },
      componentNotes: {
        wall1: "Några fogar har börjat lossna vid duschvägg.",
        wall2: "Tre kakelplattor är spruckna. Risk för fuktinträngning.",
        wall3: "",
        wall4: "",
        floor: "",
        ceiling: "Missfärgning från fukt, behöver målas om.",
        details: "Duschblandaren läcker. Silikonfogar runt handfat har släppt.",
      },
      componentPhotos: {
        wall1: [],
        wall2: [],
        wall3: [],
        wall4: [],
        floor: [],
        ceiling: [],
        details: [],
      },
      costResponsibility: {
        wall1: "landlord",
        wall2: "tenant",
        wall3: null,
        wall4: null,
        floor: null,
        ceiling: "landlord",
        details: "tenant",
      },
      photos: [],
      isApproved: true,
      isHandled: true,
    },
  },
};

// Rumsnamn för visning
const roomNames: Record<string, string> = {
  kitchen: "Kök",
  livingRoom: "Vardagsrum",
  bedroom: "Sovrum",
  bathroom: "Badrum",
};

// Mock för inflyttande hyresgäst
const incomingTenant = {
  name: "Maria Andersson",
  email: "maria.andersson@example.com",
};

export function InspectionShowcase() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Besiktningsprotokoll</h2>
        <p className="text-muted-foreground mb-6">
          Exempel på ett slutfört besiktningsprotokoll med anmärkningar, åtgärder och kostnadsansvar.
        </p>
      </div>

      <InspectionReadOnly
        inspection={mockInspectionWithRemarks}
        roomNames={roomNames}
        incomingTenant={incomingTenant}
      />
    </div>
  );
}
