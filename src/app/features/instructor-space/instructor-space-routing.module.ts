import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamBuilderComponent } from 'src/app/features/instructor-space/exam-builder/exam-builder.component';
import { InstructorExamsPageComponent } from './instructor-exams-page/instructor-exams-page.component';
import { InstructorLayoutComponent } from './instructor-layout/instructor-layout.component';

const routes: Routes = [

  {
    path: '', component: InstructorLayoutComponent, children: [
      { path: '', redirectTo: 'exams', pathMatch: 'full' },
      { path: 'exams', component: InstructorExamsPageComponent },
      { path: 'build/:id', component: ExamBuilderComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorSpaceRoutingModule { }
