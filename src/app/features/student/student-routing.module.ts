import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResponsesPageComponent } from './responses-page/responses-page.component';

const routes: Routes = [
  { path: '', component: ResponsesPageComponent },
  { path: 'my-responses', component: ResponsesPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
