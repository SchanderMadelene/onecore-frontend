
import { useState } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { Control } from "react-hook-form";

interface SubHeading {
  id: string;
  text: string;
}

interface SubHeadingsSectionProps {
  control: Control<any>;
}

export function SubHeadingsSection({ control }: SubHeadingsSectionProps) {
  const [subHeadings, setSubHeadings] = useState<SubHeading[]>([
    { id: "1", text: "" }
  ]);

  const addSubHeading = () => {
    const newId = (subHeadings.length + 1).toString();
    setSubHeadings([...subHeadings, { id: newId, text: "" }]);
  };

  const removeSubHeading = (id: string) => {
    if (subHeadings.length > 1) {
      setSubHeadings(subHeadings.filter(heading => heading.id !== id));
    }
  };

  const updateSubHeading = (id: string, text: string) => {
    setSubHeadings(subHeadings.map(heading => 
      heading.id === id ? { ...heading, text } : heading
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <FormLabel className="text-sm font-medium">Underrubriker</FormLabel>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={addSubHeading}
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" />
          Lägg till underrubrik
        </Button>
      </div>
      
      <div className="space-y-3">
        {subHeadings.map((heading, index) => (
          <div key={heading.id} className="flex items-center gap-2">
            <div className="flex-1">
              <Input
                placeholder={`Underrubrik ${index + 1}`}
                value={heading.text}
                onChange={(e) => updateSubHeading(heading.id, e.target.value)}
                className="h-12"
              />
            </div>
            {subHeadings.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeSubHeading(heading.id)}
                className="text-destructive hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
