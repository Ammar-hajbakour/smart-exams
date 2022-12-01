import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslationModule } from '@upupa/language'
import { MatrialCommon } from './material-modules.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResponsesListComponent } from './responses-list/responses-list.component';
import { ExamsListComponent } from './exams-list/exams-list.component';
import { TimerComponent } from './timer/timer.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { RouterModule } from '@angular/router';
import { ResltComponent } from './reslt/reslt.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { SearchComponent } from './search/search.component';

const imports = [CommonModule,
  TranslationModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  ...MatrialCommon]

const declarations = [ResponsesListComponent, ExamsListComponent, ResltComponent, TimerComponent, UserMenuComponent, PaginatorComponent, SearchComponent]
@NgModule({
  declarations: [...declarations],
  imports: [...imports],
  exports: [...imports, ...declarations]
})
export class SharedModule { }
