import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductCharacteristicsComponent } from "./product-characteristics.component";
import { DynamicFormSelectFieldModule } from "src/app/components/sharedComponents/dynamic-form/components/select-field/select-field.module";
import { DynamicFormRowModule } from "src/app/components/sharedComponents/dynamic-form/components/row/row.module";
import { ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [ProductCharacteristicsComponent],
  imports: [
    CommonModule,
    DynamicFormSelectFieldModule,
    DynamicFormRowModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  entryComponents: [ProductCharacteristicsComponent]
})
export class ProductCharacteristicsModule {}