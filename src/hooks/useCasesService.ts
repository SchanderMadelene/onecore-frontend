
import { useState } from "react";
import { Case } from "@/components/orders/OrderForm";

// Mock case data
const activeCasesMock: Case[] = [
  {
    id: "C001",
    title: "Vattenläcka i kök",
    reportedDate: "2023-08-15",
    status: "active",
    priority: "high",
    description: "Läckage under diskbänken, vatten samlas på golvet.",
    assignedTo: "Johan Andersson"
  },
  {
    id: "C002",
    title: "Trasigt dörrhandtag",
    reportedDate: "2023-09-02",
    status: "pending",
    priority: "low",
    description: "Badrumsdörrens handtag har lossnat.",
    assignedTo: "Maria Nilsson"
  }
];

const historicalCasesMock: Case[] = [
  {
    id: "C000",
    title: "Stopp i avlopp",
    reportedDate: "2023-05-10",
    status: "resolved",
    priority: "medium",
    description: "Handfatet i badrummet töms långsamt.",
    resolvedDate: "2023-05-12",
    assignedTo: "Erik Svensson"
  },
  {
    id: "C003",
    title: "Byte av kylskåp",
    reportedDate: "2023-04-20",
    status: "resolved",
    priority: "medium",
    description: "Kylskåpet kyler inte tillräckligt.",
    resolvedDate: "2023-04-25",
    assignedTo: "Johan Andersson"
  },
  {
    id: "C004",
    title: "Problem med element",
    reportedDate: "2023-02-05",
    status: "resolved",
    priority: "medium",
    description: "Elementet i vardagsrummet blir inte varmt.",
    resolvedDate: "2023-02-07",
    assignedTo: "Maria Nilsson"
  }
];

// In a real application, this would likely be backed by an API service
export function useCasesService() {
  const [activeCases, setActiveCases] = useState<Case[]>(activeCasesMock);
  const [historicalCases, setHistoricalCases] = useState<Case[]>(historicalCasesMock);

  const createCase = (caseData: Omit<Case, "id">) => {
    const newCase: Case = {
      ...caseData,
      id: `C${(activeCases.length + historicalCases.length + 10).toString().padStart(3, '0')}`,
    };

    console.log("Creating new case:", newCase);
    
    // In a real app, this would be an API call
    setActiveCases([newCase, ...activeCases]);
    return newCase;
  };

  // More methods could be added here, like resolving a case, updating a case, etc.
  
  return {
    activeCases,
    historicalCases,
    createCase,
  };
}
