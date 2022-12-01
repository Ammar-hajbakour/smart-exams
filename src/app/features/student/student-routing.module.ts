import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimpleLayoutComponent } from 'src/app/simple-layout/simple-layout.component';
import { ResponsesPageComponent } from './responses-page/responses-page.component';
import { StudentLayoutComponent } from './student-layout/student-layout.component';

const routes: Routes = [
  {
    path: '', component: SimpleLayoutComponent, children: [
      { path: '', redirectTo: 'my-responses', pathMatch: 'full' },
      { path: 'my-responses', component: ResponsesPageComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
