export interface ComponentSpecification {
  label: string;
  value: string;
}

export interface Component {
  id: string;
  name: string;
  type: "component" | "category";
  location: string;
  specifications: ComponentSpecification[];
  components?: Component[]; // For categories
  componentCount?: number; // For categories
}

export const mockComponents: Component[] = [
  {
    id: "1",
    name: "Vägg 2",
    type: "component",
    location: "Vardagsrum",
    specifications: [
      { label: "Material", value: "Gips" },
      { label: "Yta", value: "12 m²" },
      { label: "Färg", value: "Vit" },
    ],
  },
  {
    id: "2",
    name: "Diskho",
    type: "component",
    location: "Kök",
    specifications: [
      { label: "Material", value: "Rostfritt stål" },
      { label: "Modell", value: "Enkel ho" },
      { label: "Installerad", value: "2019" },
    ],
  },
  {
    id: "3",
    name: "Tak",
    type: "category",
    location: "Byggnad A",
    componentCount: 2,
    specifications: [
      { label: "Total area", value: "450 m²" },
      { label: "Budget", value: "850 000 kr" },
    ],
    components: [
      {
        id: "3-1",
        name: "Tegel",
        type: "component",
        location: "Tak",
        specifications: [
          { label: "Typ", value: "Rött taktegel" },
          { label: "Yta", value: "300 m²" },
          { label: "Ålder", value: "15 år" },
        ],
      },
      {
        id: "3-2",
        name: "Röklucka",
        type: "component",
        location: "Tak",
        specifications: [
          { label: "Typ", value: "Motordriven" },
          { label: "Antal", value: "4 st" },
          { label: "Service", value: "2023-06" },
        ],
      },
    ],
  },
  {
    id: "4",
    name: "Fönster",
    type: "component",
    location: "Sovrum 1",
    specifications: [
      { label: "Typ", value: "3-glas" },
      { label: "Storlek", value: "120x150 cm" },
      { label: "U-värde", value: "0.9" },
    ],
  },
];
