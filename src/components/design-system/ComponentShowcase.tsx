
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ButtonShowcase } from "./showcase/buttons/ButtonShowcase";
import { FormControlsShowcase } from "./showcase/forms/FormControlsShowcase";
import { MaintenanceUnitCard } from "./showcase/maintenance/MaintenanceUnitCard";
import { CardsShowcase } from "./showcase/cards/CardsShowcase";
import { MobileAccordion } from "@/components/ui/mobile-accordion";
import { Bell, File, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { MobileAccordionItem } from "@/components/ui/mobile-accordion";

export const ComponentShowcase = () => {
  const takSubComponents = [
    {
      name: "Takluckor",
      specs: {
        ekonomiskLivslangd: "15 år (2035)",
        tekniskLivslangd: "20 år (2040)",
        year: "2020",
        quantity: "3 st",
        brand: "Velux",
        model: "GVT 103"
      }
    },
    {
      name: "Röklucka",
      specs: {
        ekonomiskLivslangd: "20 år (2042)",
        tekniskLivslangd: "25 år (2047)",
        year: "2022",
        quantity: "1 st",
        brand: "Automatic",
        model: "RL-200"
      }
    },
    {
      name: "Taktegel",
      specs: {
        ekonomiskLivslangd: "30 år (2052)",
        tekniskLivslangd: "40 år (2062)",
        year: "2022",
        quantity: "450 m²",
        brand: "Benders",
        model: "Palema"
      }
    }
  ];

  const mobileAccordionItems: MobileAccordionItem[] = [
    {
      id: "profile",
      icon: User,
      title: "Profil",
      content: (
        <div className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="name">Namn</Label>
            <Input id="name" placeholder="John Doe" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="john.doe@example.com" />
          </div>
        </div>
      )
    },
    {
      id: "notifications",
      icon: Bell,
      title: "Aviseringar",
      content: (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications">Email aviseringar</Label>
            <Switch id="email-notifications" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="push-notifications">Push aviseringar</Label>
            <Switch id="push-notifications" />
          </div>
        </div>
      )
    },
    {
      id: "settings",
      icon: Settings,
      title: "Inställningar",
      content: (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode">Mörkt läge</Label>
            <Switch id="dark-mode" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="autoplay">Autouppspelning</Label>
            <Switch id="autoplay" />
          </div>
        </div>
      )
    },
    {
      id: "documents",
      icon: File,
      title: "Dokument",
      content: (
        <div className="space-y-2">
          <p>Inga dokument tillgängliga</p>
          <Button size="sm" variant="outline">Ladda upp dokument</Button>
        </div>
      ),
      disabled: true
    },
  ];

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Maintenance Unit Card</CardTitle>
          <CardDescription>Card component used for displaying maintenance unit information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <MaintenanceUnitCard subComponents={takSubComponents} />
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg">Fasad</h3>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg">Fönster</h3>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <ButtonShowcase />
      <FormControlsShowcase />

      <Card>
        <CardHeader>
          <CardTitle>Mobile Accordion</CardTitle>
          <CardDescription>Collapsible accordion component optimized for mobile views</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-w-md mx-auto">
            <MobileAccordion 
              items={mobileAccordionItems} 
              defaultOpen={["profile"]}
              className="space-y-3"
            />
          </div>
        </CardContent>
      </Card>

      <CardsShowcase />
    </div>
  );
};

export default ComponentShowcase;
