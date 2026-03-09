import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "./viewer/CodeBlock";
import { ResponsiveTable } from "@/shared/ui/responsive-table";
import { MobileAccordion } from "@/shared/ui/mobile-accordion";
import { MobileTabs } from "@/shared/ui/mobile-tabs";
import { CollapsibleInfoCard } from "@/shared/ui/collapsible-info-card";
import { TabLayout } from "@/shared/ui/tab-layout";
import { BulkActionBar } from "@/shared/ui/bulk-action-bar";

const DemoWrapper = ({ title, description, code, children }: { title: string; description: string; code: string; children: React.ReactNode }) => (
  <Card>
    <CardHeader>
      <div className="flex items-center gap-2 flex-wrap">
        <CardTitle className="text-lg">{title}</CardTitle>
        <Badge variant="info">Responsiv — testa i mobil/desktop-vy</Badge>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="rounded-md border p-4">{children}</div>
      <CodeBlock code={code} />
    </CardContent>
  </Card>
);

// --- ResponsiveTable Demo ---
const tableData = [
  { id: "1", name: "Kvarngatan 5", type: "Lägenhet", status: "Uthyrd" },
  { id: "2", name: "Storgatan 12", type: "Lokal", status: "Ledig" },
  { id: "3", name: "Parkvägen 3", type: "Lägenhet", status: "Uppsagd" },
];

const tableColumns = [
  { key: "name", label: "Namn", render: (item: any) => <span className="font-medium">{item.name}</span> },
  { key: "type", label: "Typ", render: (item: any) => item.type },
  { key: "status", label: "Status", render: (item: any) => <Badge variant={item.status === "Ledig" ? "success" : item.status === "Uppsagd" ? "warning" : "default"}>{item.status}</Badge> },
];

const mobileCardRenderer = (item: any) => (
  <div>
    <div className="font-medium">{item.name}</div>
    <div className="text-sm text-muted-foreground">{item.type}</div>
    <Badge variant={item.status === "Ledig" ? "success" : item.status === "Uppsagd" ? "warning" : "default"} className="mt-1">{item.status}</Badge>
  </div>
);

const ResponsiveTableDemo = () => (
  <ResponsiveTable
    data={tableData}
    columns={tableColumns}
    keyExtractor={(item) => item.id}
    mobileCardRenderer={mobileCardRenderer}
  />
);

// --- MobileAccordion Demo ---
const MobileAccordionDemo = () => (
  <MobileAccordion
    items={[
      { id: "info", title: "Grundinformation", content: <p className="text-sm text-muted-foreground">Här visas grundläggande information om objektet.</p> },
      { id: "history", title: "Historik", content: <p className="text-sm text-muted-foreground">Tidigare händelser och ändringar.</p> },
      { id: "docs", title: "Dokument", content: <p className="text-sm text-muted-foreground">Bifogade filer och avtal.</p> },
    ]}
    defaultOpen={["info"]}
  />
);

// --- MobileTabs Demo ---
const MobileTabsDemo = () => {
  const [tab, setTab] = useState("overview");
  return (
    <MobileTabs
      value={tab}
      onValueChange={setTab}
      tabs={[
        { value: "overview", label: "Översikt", content: <p className="text-sm text-muted-foreground">Övergripande information och sammanfattning.</p> },
        { value: "details", label: "Detaljer", content: <p className="text-sm text-muted-foreground">Detaljerad information om objektet.</p> },
        { value: "notes", label: "Anteckningar", content: <p className="text-sm text-muted-foreground">Interna anteckningar och kommentarer.</p> },
      ]}
    />
  );
};

// --- CollapsibleInfoCard Demo ---
const CollapsibleInfoCardDemo = () => (
  <CollapsibleInfoCard
    title="Fastighetsinformation"
    previewContent={<p className="text-sm text-muted-foreground">Kvarngatan 5, Västerås</p>}
  >
    <div className="space-y-2 text-sm">
      <div className="flex justify-between"><span className="text-muted-foreground">Byggnadsår</span><span>1965</span></div>
      <div className="flex justify-between"><span className="text-muted-foreground">Antal lägenheter</span><span>24</span></div>
      <div className="flex justify-between"><span className="text-muted-foreground">Förvaltare</span><span>Anna Svensson</span></div>
    </div>
  </CollapsibleInfoCard>
);

// --- TabLayout Demo ---
const TabLayoutDemo = () => (
  <TabLayout title="Lägenheter" count={24}>
    <p className="text-sm text-muted-foreground">Innehåll wrappat i ett Card med rubrik och antal. På mobil döljs CardHeader.</p>
  </TabLayout>
);

// --- BulkActionBar Demo ---
const BulkActionBarDemo = () => (
  <div className="relative">
    <BulkActionBar
      selectedCount={3}
      onSendSms={() => {}}
      onSendEmail={() => {}}
      onClear={() => {}}
      className="!static border rounded-md shadow-none"
    />
    <p className="text-xs text-muted-foreground mt-2">
      Normalt visas denna fixed längst ner på skärmen. Här renderas den inline för demo.
    </p>
  </div>
);

export const ResponsiveShowcase = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Responsiva komponenter</h2>
        <p className="text-sm text-muted-foreground">
          Dessa komponenter anpassar sig automatiskt efter viewport-storlek. Testa genom att ändra fönsterstorlek eller använda preview-lägets viewport-switcher.
        </p>
      </div>

      <DemoWrapper
        title="ResponsiveTable"
        description="Renderar en tabell på desktop och kort på mobil. Stöder selektion, mobileCardRenderer och hideOnMobile."
        code={`<ResponsiveTable
  data={data}
  columns={[
    { key: "name", label: "Namn", render: (item) => item.name },
    { key: "status", label: "Status", render: (item) => <Badge>{item.status}</Badge> },
  ]}
  keyExtractor={(item) => item.id}
  mobileCardRenderer={(item) => (
    <div>
      <div className="font-medium">{item.name}</div>
      <Badge>{item.status}</Badge>
    </div>
  )}
/>`}
      >
        <ResponsiveTableDemo />
      </DemoWrapper>

      <DemoWrapper
        title="MobileAccordion"
        description="Accordion med primärfärgad vänsterkant vid öppning. Standard för att visa sektioner på mobila detaljsidor."
        code={`<MobileAccordion
  items={[
    { id: "info", title: "Grundinformation", content: <div>...</div> },
    { id: "history", title: "Historik", content: <div>...</div> },
  ]}
  defaultOpen={["info"]}
/>`}
      >
        <MobileAccordionDemo />
      </DemoWrapper>

      <DemoWrapper
        title="MobileTabs"
        description="Renderar tabs på desktop och en Select-dropdown på mobil. Hanterar value/onValueChange externt."
        code={`const [tab, setTab] = useState("overview");

<MobileTabs
  value={tab}
  onValueChange={setTab}
  tabs={[
    { value: "overview", label: "Översikt", content: <div>...</div> },
    { value: "details", label: "Detaljer", content: <div>...</div> },
  ]}
/>`}
      >
        <MobileTabsDemo />
      </DemoWrapper>

      <DemoWrapper
        title="CollapsibleInfoCard"
        description="Card på desktop, collapsible med preview-innehåll på mobil. Används för informationskort som behöver sparas utrymme på mobil."
        code={`<CollapsibleInfoCard
  title="Fastighetsinformation"
  previewContent={<p>Kvarngatan 5, Västerås</p>}
>
  <div>Expanderat innehåll...</div>
</CollapsibleInfoCard>`}
      >
        <CollapsibleInfoCardDemo />
      </DemoWrapper>

      <DemoWrapper
        title="TabLayout"
        description="Wrappar innehåll i ett Card med rubrik och valfritt antal. På mobil döljs CardHeader."
        code={`<TabLayout title="Lägenheter" count={24}>
  <div>Tabb-innehåll här</div>
</TabLayout>`}
      >
        <TabLayoutDemo />
      </DemoWrapper>

      <DemoWrapper
        title="BulkActionBar"
        description="Fixed bar längst ner på skärmen vid markering av objekt. Visar antal valda och åtgärdsknappar för SMS/mejl."
        code={`<BulkActionBar
  selectedCount={3}
  onSendSms={() => {}}
  onSendEmail={() => {}}
  onClear={() => {}}
/>`}
      >
        <BulkActionBarDemo />
      </DemoWrapper>
    </div>
  );
};
