
import { PageLayout } from "@/layouts";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { ContactSearch } from "@/features/rentals/components/residence-profile/ContactSearch";
import { ProfileForm } from "@/features/rentals/components/residence-profile/ProfileForm";
import type { ContactSearchData } from "@/features/rentals/components/residence-profile/types";

const ResidenceProfilePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ContactSearchData | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    // Navigate back to rentals page with bostad tab and the specific housing sub-tab
    const activeHousingTab = location.state?.activeHousingTab || "publicerade";
    navigate('/rentals?tab=bostad', { 
      state: { activeHousingTab }
    });
  };

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="w-full space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-semibold text-muted-foreground">Bostad</h2>
        </div>

        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Sökandeprofil</h1>
        </div>

        <div className="max-w-4xl space-y-6">
          <ContactSearch
            selectedContact={selectedContact}
            onSelectContact={setSelectedContact}
          />

          <Card className={`${!selectedContact ? 'opacity-50' : ''} transition-opacity`}>
            <CardHeader>
              <CardTitle>Boendeformulär</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedContact ? (
                <ProfileForm contact={selectedContact} />
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  Sök och välj en kontakt för att fortsätta med boendeprofilen
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default ResidenceProfilePage;
