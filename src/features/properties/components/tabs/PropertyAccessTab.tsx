
import { TabLayout } from "@/components/ui/tab-layout";
import { EmptyState } from "@/components/ui/empty-state";
import { LockKeyhole } from "lucide-react";

export const PropertyAccessTab = () => {
  return (
    <TabLayout 
      title="Lås & passage" 
    >
      <EmptyState
        icon={LockKeyhole}
        title="Lås- och passageinformation"
        description="Information om lås och passagesystem för fastigheten kommer att visas här."
      />
    </TabLayout>
  );
};
