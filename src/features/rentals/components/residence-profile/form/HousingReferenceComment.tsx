
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";
import type { ProfileFormData } from "../types";

interface HousingReferenceCommentProps {
  form: UseFormReturn<ProfileFormData>;
}

export function HousingReferenceComment({ form }: HousingReferenceCommentProps) {
  const { register } = form;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Kommentarer och anteckningar
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="referenceComment">Kommentar från boendereferens</Label>
          <Textarea
            id="referenceComment"
            {...register("housingReference.comment")}
            placeholder="Skriv kommentarer från boendereferensen här..."
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  );
}
