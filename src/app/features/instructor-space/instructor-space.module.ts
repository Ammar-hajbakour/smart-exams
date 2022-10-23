import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorSpaceRoutingModule } from './instructor-space-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { InstructorLayoutComponent } from './instructor-layout/instructor-layout.component';
import { InstructorExamsPageComponent } from './instructor-exams-page/instructor-exams-page.component';
import { ExamFormComponent } from './exam-form/exam-form.component';


@NgModule({
  declarations: [
    InstructorLayoutComponent,
    InstructorExamsPageComponent,
    ExamFormComponent
  ],
  imports: [
    SharedModule,
    InstructorSpaceRoutingModule
  ]
})
export class InstructorSpaceModule { }
