
import { FormControlsShowcase } from "./showcase/forms/FormControlsShowcase";
import { StandardizedFormShowcase } from "./showcase/forms/StandardizedFormShowcase";
import { ButtonShowcase } from "./showcase/buttons/ButtonShowcase";
import { BadgeShowcase } from "./showcase/badges/BadgeShowcase";
import { CardsShowcase } from "./showcase/cards/CardsShowcase";
import { OrdersShowcase } from "./showcase/orders/OrdersShowcase";
import { MaintenanceShowcase } from "./showcase/maintenance/MaintenanceShowcase";
import { AccordionShowcase } from "./showcase/accordions/AccordionShowcase";

export const ComponentShowcase = () => {
  return (
    <div className="space-y-8">
      <StandardizedFormShowcase />
      <FormControlsShowcase />
      <ButtonShowcase />
      <BadgeShowcase />
      <CardsShowcase />
      <AccordionShowcase />
      <MaintenanceShowcase />
      <OrdersShowcase />
    </div>
  );
};
