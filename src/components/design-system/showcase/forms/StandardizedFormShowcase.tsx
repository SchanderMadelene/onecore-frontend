
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Example form schema using Zod
const exampleFormSchema = z.object({
  title: z.string().min(1, "Titel krävs"),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"], {
    required_error: "Prioritet krävs",
  }),
  email: z.string().email("Ogiltig e-postadress"),
});

type ExampleFormData = z.infer<typeof exampleFormSchema>;

export const StandardizedFormShowcase = () => {
  const { toast } = useToast();
  
  const form = useForm<ExampleFormData>({
    resolver: zodResolver(exampleFormSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      email: "",
    },
  });

  const onSubmit = (data: ExampleFormData) => {
    console.log("Form submitted:", data);
    toast({
      title: "Formulär skickat",
      description: "Formuläret har skickats framgångsrikt.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Standardiserad formulärhantering</CardTitle>
        <CardDescription>Exempel på rekommenderad formulärhantering med React Hook Form + Zod</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titel</FormLabel>
                  <FormControl>
                    <Input placeholder="Ange titel..." {...field} />
                  </FormControl>
                  <FormDescription>
                    En kort beskrivning av ärendet
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Beskrivning</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Detaljerad beskrivning..." {...field} />
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

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-post</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="exempel@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Skicka formulär</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
