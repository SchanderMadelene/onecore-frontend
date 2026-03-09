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
import { MobileOverrideProvider } from "@/shared/hooks/use-mobile";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group";
import { useIsMobile } from "@/hooks/use-mobile";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Monitor, Smartphone, ChevronDown } from "lucide-react";

const DemoWrapper = ({ title, description, code, children }: { title: string; description: string; code: string; children: React.ReactNode }) => {
  const [viewMode, setViewMode] = useState<string>("desktop");
  const isMobileOverride = viewMode === "mobile";

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <CardTitle className="text-lg">{title}</CardTitle>
            <Badge variant="info">Responsiv</Badge>
          </div>
          <ToggleGroup type="single" value={viewMode} onValueChange={(v) => v && setViewMode(v)} size="sm" variant="outline">
            <ToggleGroupItem value="desktop" aria-label="Desktop-vy">
              <Monitor className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="mobile" aria-label="Mobil-vy">
              <Smartphone className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={`rounded-md border p-4 mx-auto ${isMobileOverride ? "max-w-[375px]" : ""}`}>
          <MobileOverrideProvider isMobile={isMobileOverride}>
            {children}
          </MobileOverrideProvider>
        </div>
        <CodeBlock code={code} />
      </CardContent>
    </Card>
  );
};

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

// --- Table / Filterable Demo ---
const filterableData = [
  { id: "1", name: "Objekt A", category: "Typ 1", status: "Aktiv" },
  { id: "2", name: "Objekt B", category: "Typ 2", status: "Inaktiv" },
  { id: "3", name: "Objekt C", category: "Typ 1", status: "Aktiv" },
  { id: "4", name: "Objekt D", category: "Typ 3", status: "Pausad" },
];

const FilterableTableDemo = () => {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = filterableData.filter(item => {
    const matchCategory = !categoryFilter || item.category === categoryFilter;
    const matchStatus = !statusFilter || item.status === statusFilter;
    return matchCategory && matchStatus;
  });

  const columns = [
    { key: "name", label: "Namn", render: (item: any) => <span className="font-medium">{item.name}</span> },
    {
      key: "category",
      label: "Kategori",
      filterOptions: [...new Set(filterableData.map(d => d.category))].sort(),
      filterValue: categoryFilter,
      onFilter: setCategoryFilter,
      filterPlaceholder: "Filtrera kategori...",
      render: (item: any) => item.category,
    },
    {
      key: "status",
      label: "Status",
      filterOptions: [...new Set(filterableData.map(d => d.status))].sort(),
      filterValue: statusFilter,
      onFilter: setStatusFilter,
      filterPlaceholder: "Filtrera status...",
      render: (item: any) => (
        <Badge variant={item.status === "Aktiv" ? "success" : item.status === "Pausad" ? "warning" : "secondary"}>
          {item.status}
        </Badge>
      ),
    },
  ];

  return (
    <ResponsiveTable
      data={filtered}
      columns={columns}
      keyExtractor={(item) => item.id}
    />
  );
};

// --- Table / Selectable Demo ---
const selectableData = [
  { id: "1", name: "Objekt A", category: "Grupp 1", status: "Aktiv" },
  { id: "2", name: "Objekt B", category: "Grupp 2", status: "Inaktiv" },
  { id: "3", name: "Objekt C", category: "Grupp 1", status: "Aktiv" },
  { id: "4", name: "Objekt D", category: "Grupp 3", status: "Pausad" },
];

const SelectableTableDemo = () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  return (
    <div className="space-y-3">
      <ResponsiveTable
        data={selectableData}
        columns={[
          { key: "name", label: "Namn", render: (item: any) => <span className="font-medium">{item.name}</span> },
          { key: "category", label: "Kategori", render: (item: any) => item.category },
          {
            key: "status", label: "Status", render: (item: any) => (
              <Badge variant={item.status === "Aktiv" ? "success" : item.status === "Pausad" ? "warning" : "secondary"}>
                {item.status}
              </Badge>
            ),
          },
        ]}
        keyExtractor={(item) => item.id}
        selectable
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      />
      {selectedKeys.length > 0 && (
        <BulkActionBar
          selectedCount={selectedKeys.length}
          onSendSms={() => {}}
          onSendEmail={() => {}}
          onClear={() => setSelectedKeys([])}
          className="!static border rounded-md shadow-none"
        />
      )}
    </div>
  );
};

// --- Table / Expandable Rows Demo ---
const expandableGroups = [
  {
    id: "g1",
    name: "Kategori 1",
    count: 3,
    children: [
      { id: "g1-1", name: "Objekt A-1", status: "Aktiv", value: "120" },
      { id: "g1-2", name: "Objekt A-2", status: "Inaktiv", value: "85" },
      { id: "g1-3", name: "Objekt A-3", status: "Aktiv", value: "200" },
    ],
  },
  {
    id: "g2",
    name: "Kategori 2",
    count: 2,
    children: [
      { id: "g2-1", name: "Objekt B-1", status: "Pausad", value: "150" },
      { id: "g2-2", name: "Objekt B-2", status: "Aktiv", value: "90" },
    ],
  },
];

const ExpandableTableDemo = () => {
  const isMobile = useIsMobile();
  const [expanded, setExpanded] = useState<string[]>([]);

  const toggleGroup = (id: string) => {
    setExpanded(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
  };

  if (isMobile) {
    return (
      <MobileAccordion
        items={expandableGroups.map(group => ({
          id: group.id,
          title: `${group.name} (${group.count})`,
          content: (
            <div className="space-y-2">
              {group.children.map(child => (
                <div key={child.id} className="flex justify-between items-center py-1.5 text-sm">
                  <span className="font-medium">{child.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">{child.value}</span>
                    <Badge variant={child.status === "Aktiv" ? "success" : child.status === "Pausad" ? "warning" : "secondary"} className="text-xs">
                      {child.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ),
        }))}
        defaultOpen={[]}
      />
    );
  }

  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-8" />
            <TableHead>Namn</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Värde</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expandableGroups.map(group => (
            <>
              <TableRow
                key={group.id}
                className="cursor-pointer hover:bg-muted/50 font-medium"
                onClick={() => toggleGroup(group.id)}
              >
                <TableCell className="w-8 py-3">
                  <ChevronDown className={`h-4 w-4 transition-transform ${expanded.includes(group.id) ? "" : "-rotate-90"}`} />
                </TableCell>
                <TableCell className="py-3">{group.name}</TableCell>
                <TableCell className="py-3 text-muted-foreground">{group.count} objekt</TableCell>
                <TableCell className="py-3" />
              </TableRow>
              {expanded.includes(group.id) && group.children.map(child => (
                <TableRow key={child.id} className="bg-muted/30">
                  <TableCell className="w-8 py-2" />
                  <TableCell className="py-2 pl-8 text-sm">{child.name}</TableCell>
                  <TableCell className="py-2">
                    <Badge variant={child.status === "Aktiv" ? "success" : child.status === "Pausad" ? "warning" : "secondary"} className="text-xs">
                      {child.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-2 text-right text-sm">{child.value}</TableCell>
                </TableRow>
              ))}
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

// --- Table / Split Layout Demo ---
const splitData = [
  { id: "1", label: "Period 1", outName: "Person A", outDate: "2025-03-01", inName: "Person D", inDate: "2025-03-15" },
  { id: "2", label: "Period 2", outName: "Person B", outDate: "2025-04-01", inName: "Person E", inDate: "2025-04-10" },
  { id: "3", label: "Period 3", outName: "Person C", outDate: "2025-05-01", inName: "—", inDate: "—" },
];

const SplitLayoutTableDemo = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <MobileAccordion
        items={splitData.map(row => ({
          id: row.id,
          title: row.label,
          content: (
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Utgående</span>
                <div className="mt-1 grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5">
                  <span className="text-muted-foreground">Namn:</span><span>{row.outName}</span>
                  <span className="text-muted-foreground">Datum:</span><span>{row.outDate}</span>
                </div>
              </div>
              <div>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Inkommande</span>
                <div className="mt-1 grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5">
                  <span className="text-muted-foreground">Namn:</span><span>{row.inName}</span>
                  <span className="text-muted-foreground">Datum:</span><span>{row.inDate}</span>
                </div>
              </div>
            </div>
          ),
        }))}
        defaultOpen={["1"]}
      />
    );
  }

  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Objekt</TableHead>
            <TableHead>Utgående</TableHead>
            <TableHead>Datum</TableHead>
            <TableHead className="border-l-2 border-l-primary/20">Inkommande</TableHead>
            <TableHead>Datum</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {splitData.map(row => (
            <TableRow key={row.id}>
              <TableCell className="py-3 font-medium">{row.label}</TableCell>
              <TableCell className="py-3">{row.outName}</TableCell>
              <TableCell className="py-3 text-muted-foreground">{row.outDate}</TableCell>
              <TableCell className="py-3 border-l-2 border-l-primary/20">{row.inName}</TableCell>
              <TableCell className="py-3 text-muted-foreground">{row.inDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

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

export const TablesShowcase = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Tabeller</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Baskomponenten ResponsiveTable och dess varianter. Växla mellan desktop och mobil.
        </p>
      </div>

      <DemoWrapper
        title="Table / Base"
        description="Grundtabell som renderar en tabell på desktop och kort på mobil. Stöder mobileCardRenderer och hideOnMobile."
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
        title="Table / Filterable"
        description="Kolumner med filterOptions får automatiskt en filterikon i headern. Hover för att visa, klicka för att filtrera."
        code={`<ResponsiveTable
  data={data}
  columns={[
    { key: "name", label: "Namn", render: (item) => item.name },
    {
      key: "category",
      label: "Kategori",
      filterOptions: ["Typ 1", "Typ 2", "Typ 3"],
      filterValue: categoryFilter,
      onFilter: setCategoryFilter,
      filterPlaceholder: "Filtrera kategori...",
      render: (item) => item.category,
    },
  ]}
  keyExtractor={(item) => item.id}
/>`}
      >
        <FilterableTableDemo />
      </DemoWrapper>

      <DemoWrapper
        title="Table / Selectable"
        description="Tabell med checkboxar för rad-selektion. Kombineras med BulkActionBar för bulk-åtgärder."
        code={`const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

<ResponsiveTable
  data={data}
  columns={columns}
  keyExtractor={(item) => item.id}
  selectable
  selectedKeys={selectedKeys}
  onSelectionChange={setSelectedKeys}
/>
{selectedKeys.length > 0 && (
  <BulkActionBar
    selectedCount={selectedKeys.length}
    onClear={() => setSelectedKeys([])}
  />
)}`}
      >
        <SelectableTableDemo />
      </DemoWrapper>

      <DemoWrapper
        title="Table / Expandable Rows"
        description="Parent-rader med chevron-toggle som expanderar child-rader. På mobil används MobileAccordion istället."
        code={`// Desktop: rå <Table> med chevron-toggle
<TableRow onClick={() => toggleGroup(id)}>
  <TableCell>
    <ChevronDown className={expanded ? "" : "-rotate-90"} />
  </TableCell>
  <TableCell>{group.name}</TableCell>
</TableRow>
{expanded && children.map(child => (
  <TableRow className="bg-muted/30">...</TableRow>
))}

// Mobil: MobileAccordion
<MobileAccordion items={groups.map(g => ({
  id: g.id,
  title: g.name,
  content: <div>...</div>,
}))} />`}
      >
        <ExpandableTableDemo />
      </DemoWrapper>

      <DemoWrapper
        title="Table / Split Layout"
        description="Tabell med visuellt separerade kolumngrupper via border-l-2. På mobil visas grupperna vertikalt i MobileAccordion."
        code={`// Desktop: border-l-2 separerar kolumngrupper
<TableHead className="border-l-2 border-l-primary/20">
  Inkommande
</TableHead>
...
<TableCell className="border-l-2 border-l-primary/20">
  {row.inName}
</TableCell>

// Mobil: MobileAccordion med grupperade fält
<MobileAccordion items={data.map(row => ({
  id: row.id,
  title: row.label,
  content: (
    <div>
      <div>Utgående: {row.outName}</div>
      <div>Inkommande: {row.inName}</div>
    </div>
  ),
}))} />`}
      >
        <SplitLayoutTableDemo />
      </DemoWrapper>
    </div>
  );
};

export const LayoutShowcase = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Layout & Navigation</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Komponenter som anpassar sitt beteende efter viewport.
        </p>
      </div>

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

/** @deprecated Use TablesShowcase and LayoutShowcase instead */
export const ResponsiveShowcase = () => {
  return (
    <div className="space-y-6">
      <TablesShowcase />
      <LayoutShowcase />
    </div>
  );
};
