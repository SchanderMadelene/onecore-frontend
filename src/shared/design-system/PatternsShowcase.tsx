import { FormControlsShowcase } from "./showcase/forms/FormControlsShowcase";
import { StandardizedFormShowcase } from "./showcase/forms/StandardizedFormShowcase";
import { OrdersShowcase } from "./showcase/orders/OrdersShowcase";
import { AccordionShowcase } from "./showcase/accordions/AccordionShowcase";
import { UpdateComponentModalShowcase } from "./showcase/components/UpdateComponentModalShowcase";
import { ComponentShowcase as ComponentsAndCategoriesShowcase } from "./showcase/components/ComponentShowcase";

export const PatternsShowcase = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-1">Mönster</h2>
        <p className="text-sm text-muted-foreground">
          Sammansatta kompositioner och arbetsflöden som kombinerar flera komponenter.
        </p>
      </div>
      <ComponentsAndCategoriesShowcase />
      <StandardizedFormShowcase />
      <FormControlsShowcase />
      <AccordionShowcase />
      <OrdersShowcase />
      <UpdateComponentModalShowcase />
    </div>
  );
};
