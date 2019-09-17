import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSystemComponent } from './admin-system.component';
import { AdminSystemRouting } from './admin-system.routing.module';
import { ListModule } from 'src/app/components/sharedComponents/list/list.module';
import { FormModule } from 'src/app/components/sharedComponents/form/form.module';

@NgModule({
  declarations: [AdminSystemComponent],
  imports: [
    CommonModule,
    AdminSystemRouting,
    ListModule,
    FormModule
  ]
})
export class AdminSystemModule { }