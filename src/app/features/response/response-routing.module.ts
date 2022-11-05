import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamGuard } from 'src/app/ExamGuard';
import { CollectorComponent } from './collector/collector.component';

const routes: Routes = [
  {
    path: 'answer/:exam', component: CollectorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResponsesRoutingModule { }
