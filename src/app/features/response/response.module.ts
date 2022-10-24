import { NgModule } from '@angular/core';

import { ResponsesRoutingModule } from './response-routing.module';
import { CollectorComponent } from './collector/collector.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CollectorComponent
  ],
  imports: [
    SharedModule,
    ResponsesRoutingModule
  ]
})
export class ResponsesModule { }
