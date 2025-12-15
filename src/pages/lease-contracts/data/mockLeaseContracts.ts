import { LeaseContract } from '@/types/leaseContract';

export const mockLeaseContracts: LeaseContract[] = [
  {
    leaseId: "102-003-99-0001/01",
    leaseNumber: "01",
    rentalPropertyId: "102-003-99-0001",
    type: "Bostadskontrakt",
    leaseStartDate: "2020-03-01T00:00:00.000Z",
    leaseEndDate: null,
    status: 1,
    propertyId: "PROP-001",
    propertyName: "Kvarngärdet 1",
    buildingId: "BUILD-001A",
    buildingName: "Storgatan 12",
    tenants: [
      {
        contactCode: "P123456",
        contactKey: "_ABC123",
        firstName: "Anna",
        lastName: "Andersson",
        fullName: "Andersson Anna",
        nationalRegistrationNumber: "198501154321",
        birthDate: "1985-01-15T00:00:00.000Z",
        address: {
          street: "Storgatan 12",
          number: "A",
          postalCode: "72215",
          city: "VÄSTERÅS"
        },
        phoneNumbers: [
          {
            phoneNumber: "0701234567",
            type: "mobil",
            isMainNumber: 1
          }
        ],
        emailAddress: "anna.andersson@email.se",
        isTenant: true
      },
      {
        contactCode: "P123457",
        contactKey: "_ABC124",
        firstName: "Mikael",
        lastName: "Andersson",
        fullName: "Andersson Mikael",
        nationalRegistrationNumber: "198307221234",
        birthDate: "1983-07-22T00:00:00.000Z",
        address: {
          street: "Storgatan 12",
          number: "A",
          postalCode: "72215",
          city: "VÄSTERÅS"
        },
        phoneNumbers: [
          {
            phoneNumber: "0702345678",
            type: "mobil",
            isMainNumber: 1
          }
        ],
        emailAddress: "mikael.andersson@email.se",
        isTenant: true
      }
    ],
    noticeGivenBy: null,
    noticeDate: null,
    noticeTimeTenant: null,
    preferredMoveOutDate: null,
    terminationDate: null,
    contractDate: "2020-02-15T00:00:00.000Z",
    lastDebitDate: null,
    approvalDate: "2020-02-15T00:00:00.000Z",
    district: "Centrum"
  },
  {
    leaseId: "102-003-99-0002/02",
    leaseNumber: "02",
    rentalPropertyId: "102-003-99-0002",
    type: "Bostadskontrakt",
    leaseStartDate: "2021-06-01T00:00:00.000Z",
    leaseEndDate: null,
    status: 2,
    propertyId: "PROP-001",
    propertyName: "Kvarngärdet 1",
    buildingId: "BUILD-001B",
    buildingName: "Kungsgatan 5",
    tenants: [
      {
        contactCode: "P234567",
        contactKey: "_DEF456",
        firstName: "Erik",
        lastName: "Eriksson",
        fullName: "Eriksson Erik",
        nationalRegistrationNumber: "199003124567",
        birthDate: "1990-03-12T00:00:00.000Z",
        address: {
          street: "Kungsgatan 5",
          number: "",
          postalCode: "72214",
          city: "VÄSTERÅS"
        },
        phoneNumbers: [
          {
            phoneNumber: "0709876543",
            type: "mobil",
            isMainNumber: 1
          }
        ],
        emailAddress: "erik.eriksson@email.se",
        isTenant: true
      },
      {
        contactCode: "P234568",
        contactKey: "_DEF457",
        firstName: "Sofia",
        lastName: "Eriksson",
        fullName: "Eriksson Sofia",
        nationalRegistrationNumber: "199204087654",
        birthDate: "1992-04-08T00:00:00.000Z",
        address: {
          street: "Kungsgatan 5",
          number: "",
          postalCode: "72214",
          city: "VÄSTERÅS"
        },
        phoneNumbers: [
          {
            phoneNumber: "0708765432",
            type: "mobil",
            isMainNumber: 1
          }
        ],
        emailAddress: "sofia.eriksson@email.se",
        isTenant: true
      }
    ],
    noticeGivenBy: "G",
    noticeDate: "2024-01-15T00:00:00.000Z",
    noticeTimeTenant: 3,
    preferredMoveOutDate: "2024-04-30T00:00:00.000Z",
    terminationDate: null,
    contractDate: "2021-05-20T00:00:00.000Z",
    lastDebitDate: "2024-04-30T00:00:00.000Z",
    approvalDate: "2021-05-20T00:00:00.000Z",
    district: "Väster"
  },
  {
    leaseId: "102-003-99-0003/03",
    leaseNumber: "03",
    rentalPropertyId: "102-003-99-0003",
    type: "Bilplatskontrakt",
    leaseStartDate: "2022-01-01T00:00:00.000Z",
    leaseEndDate: null,
    status: 1,
    propertyId: "PROP-002",
    propertyName: "Björklunden 3",
    buildingId: "BUILD-002A",
    buildingName: "Vasagatan 22",
    tenants: [
      {
        contactCode: "P345678",
        contactKey: "_GHI789",
        firstName: "Maria",
        lastName: "Svensson",
        fullName: "Svensson Maria",
        nationalRegistrationNumber: "198808087654",
        birthDate: "1988-08-08T00:00:00.000Z",
        address: {
          street: "Vasagatan 22",
          number: "B",
          postalCode: "72216",
          city: "VÄSTERÅS"
        },
        phoneNumbers: [
          {
            phoneNumber: "0735551234",
            type: "mobil",
            isMainNumber: 1
          }
        ],
        emailAddress: "maria.svensson@email.se",
        isTenant: true
      }
    ],
    noticeGivenBy: null,
    noticeDate: null,
    noticeTimeTenant: null,
    preferredMoveOutDate: null,
    terminationDate: null,
    contractDate: "2021-12-15T00:00:00.000Z",
    lastDebitDate: null,
    approvalDate: "2021-12-15T00:00:00.000Z",
    district: "Öster"
  },
  {
    leaseId: "102-003-99-0004/04",
    leaseNumber: "04",
    rentalPropertyId: "102-003-99-0004",
    type: "Förrådkontrakt",
    leaseStartDate: "2023-02-01T00:00:00.000Z",
    leaseEndDate: "2023-11-30T00:00:00.000Z",
    status: 3,
    propertyId: "PROP-002",
    propertyName: "Björklunden 3",
    buildingId: "BUILD-002B",
    buildingName: "Drottninggatan 8",
    tenants: [
      {
        contactCode: "P456789",
        contactKey: "_JKL012",
        firstName: "Karl",
        lastName: "Johansson",
        fullName: "Johansson Karl",
        nationalRegistrationNumber: "197505053456",
        birthDate: "1975-05-05T00:00:00.000Z",
        address: {
          street: "Drottninggatan 8",
          number: "",
          postalCode: "72217",
          city: "VÄSTERÅS"
        },
        phoneNumbers: [
          {
            phoneNumber: "0768889999",
            type: "mobil",
            isMainNumber: 1
          }
        ],
        emailAddress: "karl.johansson@email.se",
        isTenant: false
      }
    ],
    noticeGivenBy: "G",
    noticeDate: "2023-08-07T00:00:00.000Z",
    noticeTimeTenant: 3,
    preferredMoveOutDate: "2023-11-30T00:00:00.000Z",
    terminationDate: "2023-11-30T00:00:00.000Z",
    contractDate: "2023-01-15T00:00:00.000Z",
    lastDebitDate: "2023-11-30T00:00:00.000Z",
    approvalDate: "2023-01-15T00:00:00.000Z",
    district: "Centrum"
  },
  {
    leaseId: "102-003-99-0005/05",
    leaseNumber: "05",
    rentalPropertyId: "102-003-99-0005",
    type: "Bostadskontrakt",
    leaseStartDate: "2024-03-01T00:00:00.000Z",
    leaseEndDate: null,
    status: 0,
    propertyId: "PROP-003",
    propertyName: "Ekudden 5",
    buildingId: "BUILD-003A",
    buildingName: "Eriksbergsgatan 3",
    tenants: [
      {
        contactCode: "P567890",
        contactKey: "_MNO345",
        firstName: "Lisa",
        lastName: "Nilsson",
        fullName: "Nilsson Lisa",
        nationalRegistrationNumber: "199506156789",
        birthDate: "1995-06-15T00:00:00.000Z",
        address: {
          street: "Eriksbergsgatan 3",
          number: "",
          postalCode: "72218",
          city: "VÄSTERÅS"
        },
        phoneNumbers: [
          {
            phoneNumber: "0721112222",
            type: "mobil",
            isMainNumber: 1
          }
        ],
        emailAddress: "lisa.nilsson@email.se",
        isTenant: false
      }
    ],
    noticeGivenBy: null,
    noticeDate: null,
    noticeTimeTenant: null,
    preferredMoveOutDate: null,
    terminationDate: null,
    contractDate: "2024-02-01T00:00:00.000Z",
    lastDebitDate: null,
    approvalDate: "2024-02-01T00:00:00.000Z",
    district: "Norr"
  },
  {
    leaseId: "102-003-99-0006/06",
    leaseNumber: "06",
    rentalPropertyId: "102-003-99-0006",
    type: "Bilplatskontrakt",
    leaseStartDate: "2019-09-01T00:00:00.000Z",
    leaseEndDate: null,
    status: 4,
    propertyId: "PROP-003",
    propertyName: "Ekudden 5",
    buildingId: "BUILD-003B",
    buildingName: "Ringvägen 15",
    tenants: [
      {
        contactCode: "P678901",
        contactKey: "_PQR678",
        firstName: "Johan",
        lastName: "Larsson",
        fullName: "Larsson Johan",
        nationalRegistrationNumber: "198212121234",
        birthDate: "1982-12-12T00:00:00.000Z",
        address: {
          street: "Ringvägen 15",
          number: "C",
          postalCode: "72219",
          city: "VÄSTERÅS"
        },
        phoneNumbers: [
          {
            phoneNumber: "0733334444",
            type: "mobil",
            isMainNumber: 1
          }
        ],
        emailAddress: "johan.larsson@email.se",
        isTenant: true
      }
    ],
    noticeGivenBy: null,
    noticeDate: null,
    noticeTimeTenant: null,
    preferredMoveOutDate: null,
    terminationDate: null,
    contractDate: "2019-08-15T00:00:00.000Z",
    lastDebitDate: null,
    approvalDate: "2019-08-15T00:00:00.000Z",
    district: "Söder"
  },
  {
    leaseId: "102-003-99-0007/07",
    leaseNumber: "07",
    rentalPropertyId: "102-003-99-0007",
    type: "Förrådkontrakt",
    leaseStartDate: "2022-05-01T00:00:00.000Z",
    leaseEndDate: null,
    status: 1,
    propertyId: "PROP-001",
    propertyName: "Kvarngärdet 1",
    buildingId: "BUILD-001A",
    buildingName: "Storgatan 12",
    tenants: [
      {
        contactCode: "P789012",
        contactKey: "_STU901",
        firstName: "Sara",
        lastName: "Gustafsson",
        fullName: "Gustafsson Sara",
        nationalRegistrationNumber: "199109094567",
        birthDate: "1991-09-09T00:00:00.000Z",
        address: {
          street: "Parkgatan 7",
          number: "",
          postalCode: "72220",
          city: "VÄSTERÅS"
        },
        phoneNumbers: [
          {
            phoneNumber: "0765556666",
            type: "mobil",
            isMainNumber: 1
          }
        ],
        emailAddress: "sara.gustafsson@email.se",
        isTenant: true
      }
    ],
    noticeGivenBy: null,
    noticeDate: null,
    noticeTimeTenant: null,
    preferredMoveOutDate: null,
    terminationDate: null,
    contractDate: "2022-04-20T00:00:00.000Z",
    lastDebitDate: null,
    approvalDate: "2022-04-20T00:00:00.000Z",
    district: "Väster"
  }
];
