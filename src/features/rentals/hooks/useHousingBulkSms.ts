import { useMemo, useState } from "react";
import { toast } from "sonner";

interface Recipient {
  id: string;
  name: string;
  phone?: string;
}

/**
 * Hook for managing bulk SMS to applicants of selected housing listings.
 * Each selected listing expands to a recipient list of its applicants.
 */
export function useHousingBulkSms(
  housings: Array<{ id: string; address: string; seekers: number }>
) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [smsOpen, setSmsOpen] = useState(false);

  const recipients: Recipient[] = useMemo(() => {
    // Mock: generate one recipient per "seeker" for each selected housing.
    // In production this would resolve against the applicant data source.
    const list: Recipient[] = [];
    housings
      .filter((h) => selectedIds.includes(h.id))
      .forEach((h) => {
        for (let i = 0; i < h.seekers; i++) {
          list.push({
            id: `${h.id}-applicant-${i}`,
            name: `Sökande ${i + 1} – ${h.address}`,
            phone: `+4670${String(1000000 + i + h.id.length).slice(0, 7)}`,
          });
        }
      });
    return list;
  }, [housings, selectedIds]);

  const handleSendSms = async (message: string, sentTo: Recipient[]) => {
    // Mock send
    await new Promise((r) => setTimeout(r, 400));
    toast.success(`SMS skickat till ${sentTo.length} mottagare`);
    setSelectedIds([]);
  };

  return {
    selectedIds,
    setSelectedIds,
    smsOpen,
    setSmsOpen,
    recipients,
    handleSendSms,
    clearSelection: () => setSelectedIds([]),
  };
}
