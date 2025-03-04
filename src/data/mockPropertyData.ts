
import type { PropertyDetail } from "@/types/api";

export const mockPropertyDetails: Record<string, PropertyDetail> = {
  "odenplan-5": {
    id: "odenplan-5",
    propertyObjectId: "P1",
    code: "FAST-001",
    designation: "Odenplan 5",
    municipality: "Västerås",
    purpose: "Bostadshus",
    address: "Odenplan 5",
    district: "Lundby",
    buildings: [
      {
        id: "b1",
        name: "Norra huset",
        type: "Flerfamiljshus",
        area: 1250,
        floors: 5,
        tenants: 35,
        apartments: [
          {
            id: "lgh-101",
            code: "LGH-101",
            area: 65,
            rooms: 2,
            status: "Uthyrd"
          },
          {
            id: "lgh-102",
            code: "LGH-102",
            area: 85,
            rooms: 3,
            status: "Uthyrd"
          }
        ]
      },
      {
        id: "b2",
        name: "Södra huset",
        type: "Flerfamiljshus",
        area: 980,
        floors: 4,
        tenants: 28,
        apartments: [
          {
            id: "lgh-201",
            code: "LGH-201",
            area: 55,
            rooms: 2,
            status: "Ledig"
          },
          {
            id: "lgh-202",
            code: "LGH-202",
            area: 75,
            rooms: 3,
            status: "Uthyrd"
          }
        ]
      }
    ],
    propertyMap: {
      image: "",
      buildings: [
        {
          id: "b1",
          name: "Norra",
          x: 50,
          y: 50,
          width: 150,
          height: 100
        },
        {
          id: "b2",
          name: "Södra",
          x: 50,
          y: 250,
          width: 150,
          height: 100
        }
      ]
    }
  },
  "sveavagen-10": {
    id: "sveavagen-10",
    propertyObjectId: "P2",
    code: "FAST-002",
    designation: "Sveavägen 10",
    municipality: "Västerås",
    purpose: "Bostadshus",
    address: "Sveavägen 10",
    district: "Domkyrkan",
    buildings: [
      {
        id: "b3",
        name: "Huvudbyggnaden",
        type: "Flerfamiljshus",
        area: 1800,
        floors: 6,
        tenants: 42,
        apartments: [
          {
            id: "lgh-201",
            code: "LGH-201",
            area: 75,
            rooms: 3,
            status: "Uthyrd"
          },
          {
            id: "lgh-202",
            code: "LGH-202",
            area: 45,
            rooms: 1,
            status: "Uthyrd"
          }
        ]
      }
    ],
    propertyMap: {
      image: "",
      buildings: [
        {
          id: "b3",
          name: "Huvudbygg.",
          x: 100,
          y: 150,
          width: 200,
          height: 120
        }
      ]
    }
  },
  "gotgatan-15": {
    id: "gotgatan-15",
    propertyObjectId: "P3",
    code: "FAST-003",
    designation: "Götgatan 15",
    municipality: "Västerås",
    purpose: "Bostadshus",
    address: "Götgatan 15",
    district: "Bäckby",
    buildings: [
      {
        id: "b4",
        name: "A-huset",
        type: "Flerfamiljshus",
        area: 950,
        floors: 3,
        tenants: 18,
        apartments: [
          {
            id: "lgh-301",
            code: "LGH-301",
            area: 68,
            rooms: 2,
            status: "Uthyrd"
          },
          {
            id: "lgh-302",
            code: "LGH-302",
            area: 92,
            rooms: 4,
            status: "Ledig"
          }
        ]
      },
      {
        id: "b5",
        name: "B-huset",
        type: "Flerfamiljshus",
        area: 850,
        floors: 3,
        tenants: 15,
        apartments: []
      }
    ],
    propertyMap: {
      image: "",
      buildings: [
        {
          id: "b4",
          name: "A-huset",
          x: 80,
          y: 80,
          width: 120,
          height: 100
        },
        {
          id: "b5",
          name: "B-huset",
          x: 250,
          y: 150,
          width: 120,
          height: 100
        }
      ]
    }
  }
};
