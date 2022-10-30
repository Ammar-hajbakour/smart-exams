import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { ResponsesPageComponent } from './responses-page/responses-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentLayoutComponent } from './student-layout/student-layout.component';


@NgModule({
  declarations: [
    ResponsesPageComponent,
    StudentLayoutComponent
  ],
  imports: [
    SharedModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
