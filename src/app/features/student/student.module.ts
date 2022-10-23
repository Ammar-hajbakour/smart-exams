import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { ResponsesPageComponent } from './responses-page/responses-page.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ResponsesPageComponent
  ],
  imports: [
    SharedModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
