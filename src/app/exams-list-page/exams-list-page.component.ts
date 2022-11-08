import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { LanguageService } from '@upupa/language';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

import { Exam } from '../models/exam.model';
import { Filter } from '../models/filter.model';
import { ExamsService } from '../shared/exams.service';
@Component({
  selector: 'app-exams-list-page',
  templateUrl: './exams-list-page.component.html',
  styleUrls: ['./exams-list-page.component.scss'],
})
export class ExamsListPageComponent implements OnInit {

  constructor(public examsService: ExamsService, private router: Router, public ls: LanguageService) {
    this.ls.dir$.subscribe(d => this.dir = d)
  }

  exams$: ReplaySubject<Exam[]> = new ReplaySubject(1)

  categories: string[] = []
  instructors: string[] = []

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  total$ = new Subject<number>()
  pageSize: number = 1
  page: number = 1
  dir: 'ltr' | 'rtl' = 'ltr'
  filter!: Filter
  async ngOnInit() {
    await this.getExams(this.page, this.pageSize)
    this.total$.next(await this.examsService.getExamsCount())
    this.categories = await this.examsService.getCategories()
    this.instructors = await this.examsService.getInstructors()
  }
  async getExams(page: number, pageSize: number, filter?: Filter) {
    this.exams$.next(await this.examsService.getExams(page, pageSize, filter))
  }
  showDetails(examId: string) {
    this.router.navigate([`/${this.ls.language ?? this.ls.defaultLang}/exam/${examId}`])
  }
  async applyFilter(e: Filter) {
    this.filter = e
    this.exams$.next(await this.examsService.getExams(this.page, this.pageSize, e))
    this.total$.next(await this.examsService.getExamsCount())

  }
}
