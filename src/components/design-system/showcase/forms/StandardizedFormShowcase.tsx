
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Standardiserad formulärhantering</CardTitle>
        <CardDescription>
          Exempel på standardiserat formulär med React Hook Form + Zod validering
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            
            <Button type="submit">Skicka</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
