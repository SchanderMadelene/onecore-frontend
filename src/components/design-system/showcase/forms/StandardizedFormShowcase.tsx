
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormWrapper } from "@/components/ui/form-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const exampleSchema = z.object({
  name: z.string().min(1, "Namn krävs"),
  email: z.string().email("Ogiltig e-postadress"),
  priority: z.enum(["low", "medium", "high"], {
    required_error: "Prioritet krävs",
  }),
});

type ExampleFormData = z.infer<typeof exampleSchema>;

export const StandardizedFormShowcase = () => {
  const form = useForm<ExampleFormData>({
    resolver: zodResolver(exampleSchema),
    defaultValues: {
      name: "",
      email: "",
      priority: "medium",
    },
  });

  const onSubmit = (data: ExampleFormData) => {
    console.log("Form submitted:", data);
  };

  const formHeader = (
    <div>
      <h3 className="text-lg font-semibold">Exempel formulär</h3>
      <p className="text-sm text-muted-foreground">Demonstrerar sticky header och footer</p>
    </div>
  );

  const formFooter = (
    <div className="flex gap-2">
      <Button type="submit">Skicka</Button>
      <Button type="button" variant="outline">Avbryt</Button>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Standardiserad formulärhantering</CardTitle>
        <CardDescription>
          Exempel på standardiserat formulär med React Hook Form + Zod validering, sticky header/footer
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormWrapper 
          maxHeight="400px"
          onSubmit={form.handleSubmit(onSubmit)}
          header={formHeader}
          footer={formFooter}
        >
          <Form {...form}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Namn</FormLabel>
                  <FormControl>
                    <Input placeholder="Ange namn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-post</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="ange@email.se" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prioritet</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Välj prioritet" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="low">Låg</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">Hög</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Extra content to demonstrate scrolling */}
            <div className="space-y-4 pt-4">
              <h4 className="font-medium">Extra innehåll för att demonstrera scrolling:</h4>
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i} className="p-4 border rounded-lg">
                  <p>Detta är extra innehåll #{i + 1} för att visa att formuläret scrollar korrekt.</p>
                </div>
              ))}
            </div>
          </Form>
        </FormWrapper>
      </CardContent>
    </Card>
  );
};
