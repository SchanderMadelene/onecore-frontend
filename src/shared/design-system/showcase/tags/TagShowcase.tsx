import { Tag } from "@/shared/ui/tag";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const TagShowcase = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tags</CardTitle>
        <CardDescription>Generisk tagg-komponent för kategorisering och märkning med valfria färger</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-3">Standard (muted)</h3>
          <div className="flex flex-wrap gap-4">
            <Tag>Standard</Tag>
            <Tag>Block</Tag>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-medium mb-3">Egna färger</h3>
          <div className="flex flex-wrap gap-4">
            <Tag bg="bg-amber-400" color="text-black">Student</Tag>
            <Tag bg="bg-rose-200" color="text-rose-900">Co-living</Tag>
            <Tag bg="bg-purple-100" color="text-purple-800">55+</Tag>
            <Tag bg="bg-teal-400" color="text-black">Trygghetsboende</Tag>
            <Tag bg="bg-orange-400" color="text-black">Poängfritt</Tag>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-medium mb-3">Badge vs Tag</h3>
          <p className="text-sm text-muted-foreground">
            <strong>Badge</strong> = statusindikator med fasta semantiska varianter (info, warning, success…).{" "}
            <strong>Tag</strong> = kategorisering/märkning med valfria färger.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
