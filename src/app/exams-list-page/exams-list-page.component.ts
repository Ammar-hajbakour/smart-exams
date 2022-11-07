import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { LanguageService } from '@upupa/language';
import { ReplaySubject } from 'rxjs';

import { Exam } from '../models/exam.model';
import { ExamsService } from '../shared/exams.service';
@Component({
  selector: 'app-exams-list-page',
  templateUrl: './exams-list-page.component.html',
  styleUrls: ['./exams-list-page.component.scss'],
})
export class ExamsListPageComponent implements OnInit {

  constructor(public examsService: ExamsService, private router: Router, public ls: LanguageService) { }

  exams$: ReplaySubject<Exam[]> = new ReplaySubject(1)

  categories: Array<{ string: Exam[] }> = []
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  total = 0
  pageSize: number = 3
  page: number = 1
  async ngOnInit() {
    await this.getExams(this.page, this.pageSize)
    this.total = await this.examsService.getExamsCount()
  }
  async getExams(page: number, pageSize: number) {
    this.exams$.next(await this.examsService.getExams(page, pageSize))
    console.log(page)
  }
  showDetails(examId: string) {
    this.router.navigate([`/${this.ls.language ?? this.ls.defaultLang}/exam/${examId}`])
  }
}
