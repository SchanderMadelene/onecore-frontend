
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type MasterKeySectionProps = {
  needsMasterKey: string;
  setNeedsMasterKey: (value: string) => void;
};

export function MasterKeySection({
  needsMasterKey,
  setNeedsMasterKey,
}: MasterKeySectionProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="masterKey" className="block text-sm font-medium">
        Huvudnyckel?
      </Label>
      <RadioGroup id="masterKey" value={needsMasterKey} onValueChange={setNeedsMasterKey} className="flex space-x-4">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="ja" id="masterKeyYes" />
          <Label htmlFor="masterKeyYes" className="cursor-pointer">Ja</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="nej" id="masterKeyNo" />
          <Label htmlFor="masterKeyNo" className="cursor-pointer">Nej</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
