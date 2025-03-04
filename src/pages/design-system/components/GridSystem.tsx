
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Helper component to display grid cells
const GridCell = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-accent/20 border border-accent/40 rounded p-3 flex items-center justify-center text-sm">
    {children}
  </div>
);

export const GridSystem = () => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Basic Grid</CardTitle>
          <CardDescription>Demonstrating basic grid layouts with Tailwind CSS</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">2 Column Grid</h3>
            <div className="grid grid-cols-2 gap-4">
              <GridCell>Column 1</GridCell>
              <GridCell>Column 2</GridCell>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium">3 Column Grid</h3>
            <div className="grid grid-cols-3 gap-4">
              <GridCell>Column 1</GridCell>
              <GridCell>Column 2</GridCell>
              <GridCell>Column 3</GridCell>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium">4 Column Grid</h3>
            <div className="grid grid-cols-4 gap-4">
              <GridCell>Column 1</GridCell>
              <GridCell>Column 2</GridCell>
              <GridCell>Column 3</GridCell>
              <GridCell>Column 4</GridCell>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Responsive Grid</CardTitle>
          <CardDescription>Grid layouts that adapt to different screen sizes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Responsive Column Layout</h3>
            <p className="text-muted-foreground text-sm">
              1 column on small screens, 2 columns on medium screens, 4 columns on large screens
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <GridCell>Item 1</GridCell>
              <GridCell>Item 2</GridCell>
              <GridCell>Item 3</GridCell>
              <GridCell>Item 4</GridCell>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Advanced Grid Features</CardTitle>
          <CardDescription>Demonstrating column spans and grid areas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Column Spans</h3>
            <div className="grid grid-cols-3 gap-4">
              <GridCell className="col-span-2">Span 2 Columns</GridCell>
              <GridCell>1 Column</GridCell>
              <GridCell>1 Column</GridCell>
              <GridCell className="col-span-2">Span 2 Columns</GridCell>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Dashboard Layout Example</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <GridCell className="md:col-span-3 h-16">Header Area</GridCell>
              <GridCell className="md:col-span-2 h-64">Main Content</GridCell>
              <GridCell className="h-64">Sidebar</GridCell>
              <GridCell className="md:col-span-3 h-16">Footer Area</GridCell>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
