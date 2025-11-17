
import { FormControlsShowcase } from "./showcase/forms/FormControlsShowcase";
import { StandardizedFormShowcase } from "./showcase/forms/StandardizedFormShowcase";
import { ButtonShowcase } from "./showcase/buttons/ButtonShowcase";
import { BadgeShowcase } from "./showcase/badges/BadgeShowcase";
import { OrdersShowcase } from "./showcase/orders/OrdersShowcase";
import { AccordionShowcase } from "./showcase/accordions/AccordionShowcase";
import { UpdateComponentModalShowcase } from "./showcase/components/UpdateComponentModalShowcase";
import { ComponentShowcase as ComponentsAndCategoriesShowcase } from "./showcase/components/ComponentShowcase";

export const ComponentShowcase = () => {
  return (
    <div className="space-y-8">
      <ComponentsAndCategoriesShowcase />
      <StandardizedFormShowcase />
      <FormControlsShowcase />
      <ButtonShowcase />
      <BadgeShowcase />
      <AccordionShowcase />
      <OrdersShowcase />
      <UpdateComponentModalShowcase />
    </div>
  );
};
