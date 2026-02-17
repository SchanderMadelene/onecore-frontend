
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Typography = () => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Headings</CardTitle>
          <CardDescription>Typography used for page and section headings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">Heading 1</h1>
            <p className="text-sm text-muted-foreground">Font Size: 2.5rem (40px), Font Weight: 700</p>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Heading 2</h2>
            <p className="text-sm text-muted-foreground">Font Size: 1.875rem (30px), Font Weight: 700</p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-2xl font-bold tracking-tight">Heading 3</h3>
            <p className="text-sm text-muted-foreground">Font Size: 1.5rem (24px), Font Weight: 700</p>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-xl font-semibold">Heading 4</h4>
            <p className="text-sm text-muted-foreground">Font Size: 1.25rem (20px), Font Weight: 600</p>
          </div>
          
          <div className="space-y-2">
            <h5 className="text-lg font-medium">Heading 5</h5>
            <p className="text-sm text-muted-foreground">Font Size: 1.125rem (18px), Font Weight: 500</p>
          </div>
          
          <div className="space-y-2">
            <h6 className="text-base font-medium">Heading 6</h6>
            <p className="text-sm text-muted-foreground">Font Size: 1rem (16px), Font Weight: 500</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Paragraphs</CardTitle>
          <CardDescription>Text styles used for body content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-base leading-7">
              This is a normal paragraph. The quick brown fox jumps over the lazy dog. This text is rendered at the default size and weight to demonstrate the standard text appearance in the application.
            </p>
            <p className="text-sm text-muted-foreground">Font Size: 1rem (16px), Font Weight: 400, Line Height: 1.75</p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm leading-6">
              This is a small paragraph. The quick brown fox jumps over the lazy dog. This text is rendered at a smaller size to demonstrate secondary or supporting text.
            </p>
            <p className="text-sm text-muted-foreground">Font Size: 0.875rem (14px), Font Weight: 400, Line Height: 1.5</p>
          </div>
          
          <div className="space-y-2">
            <p className="text-xs leading-5">
              This is extra small text. The quick brown fox jumps over the lazy dog. This text is used for captions, footnotes, or other supplementary information.
            </p>
            <p className="text-sm text-muted-foreground">Font Size: 0.75rem (12px), Font Weight: 400, Line Height: 1.25</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Text Variants</CardTitle>
          <CardDescription>Additional text styling used throughout the application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Muted Text: Used for labels and less important information</p>
            <p className="text-sm text-muted-foreground">Uses the text-sm and text-muted-foreground classes</p>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">Medium Text: Used for values and semi-emphasized content</p>
            <p className="text-sm text-muted-foreground">Font Weight: 500</p>
          </div>
          
          <div className="space-y-2">
            <p className="font-semibold">Semibold Text: Used for important content and subheadings</p>
            <p className="text-sm text-muted-foreground">Font Weight: 600</p>
          </div>
          
          <div className="space-y-2">
            <p className="font-bold">Bold Text: Used for headings and strongly emphasized content</p>
            <p className="text-sm text-muted-foreground">Font Weight: 700</p>
          </div>
          
          <div className="space-y-2">
            <p className="italic">Italic Text: Used for emphasized or quoted content</p>
            <p className="text-sm text-muted-foreground">Font Style: Italic</p>
          </div>
          
          <div className="space-y-2">
            <p className="underline">Underlined Text: Used for links or emphasized content</p>
            <p className="text-sm text-muted-foreground">Text Decoration: Underline</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
