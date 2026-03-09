import { ColorPalette } from "./ColorPalette";
import { Typography } from "./Typography";
import { GridSystem } from "./GridSystem";
import { IconsShowcase } from "./IconsShowcase";
import { LogosShowcase } from "./LogosShowcase";

export const FoundationsShowcase = () => {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-xl font-semibold mb-4">Färger</h2>
        <ColorPalette />
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4">Typografi</h2>
        <Typography />
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4">Grid</h2>
        <GridSystem />
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4">Ikoner</h2>
        <IconsShowcase />
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4">Logotyper</h2>
        <LogosShowcase />
      </section>
    </div>
  );
};
