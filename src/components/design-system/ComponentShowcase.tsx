
import { FormControlsShowcase } from "./showcase/forms/FormControlsShowcase";
import { StandardizedFormShowcase } from "./showcase/forms/StandardizedFormShowcase";
import { ButtonShowcase } from "./showcase/buttons/ButtonShowcase";
import { CardsShowcase } from "./showcase/cards/CardsShowcase";
import { OrdersShowcase } from "./showcase/orders/OrdersShowcase";
import { MaintenanceShowcase } from "./showcase/maintenance/MaintenanceShowcase";

export const ComponentShowcase = () => {
  return (
    <div className="space-y-8">
      <StandardizedFormShowcase />
      <FormControlsShowcase />
      <ButtonShowcase />
      <CardsShowcase />
      <MaintenanceShowcase />
      <OrdersShowcase />
    </div>
  );
};
