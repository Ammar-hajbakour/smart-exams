import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslationModule } from '@upupa/language'
import { MatrialCommon } from './material-modules.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResponsesListComponent } from './responses-list/responses-list.component';
import { FilterComponent } from '../components/filter/filter.component';
import { ExamBuilderComponent } from '../components/exam-builder/exam-builder.component';
import { ExamsListComponent } from './exams-list/exams-list.component';

const imports = [CommonModule,
  TranslationModule,
  FormsModule,
  ReactiveFormsModule,
  ...MatrialCommon]

const declarations = [ResponsesListComponent, FilterComponent, ExamBuilderComponent, ExamsListComponent]
@NgModule({
  declarations: [...declarations],
  imports: [...imports],
  exports: [...imports, ...declarations]
})
export class SharedModule { }
