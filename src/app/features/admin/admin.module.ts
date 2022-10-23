import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';


@NgModule({
  declarations: [
    AdminLayoutComponent
  ],
  imports: [

    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
