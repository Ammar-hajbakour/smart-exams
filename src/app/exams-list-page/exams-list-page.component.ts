import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '@upupa/language';
import { BehaviorSubject, combineLatest, debounceTime, filter, fromEvent, map, Observable, ReplaySubject, Subject, switchMap, takeUntil, tap } from 'rxjs';

import { Exam } from '../models/exam.model';
import { Filter } from '../models/filter.model';
import { ExamsService } from '../shared/exams.service';
@Component({
  selector: 'app-exams-list-page',
  templateUrl: './exams-list-page.component.html',
  styleUrls: ['./exams-list-page.component.scss'],
})
export class ExamsListPageComponent implements AfterViewInit, OnInit {
  exams: Exam[] = []
  filter!: Filter;
  destroyed$ = new Subject()
  filter$: BehaviorSubject<Filter> = new BehaviorSubject(this.filter)
  loadMore$ = new BehaviorSubject<boolean>(false)
  canLoadMore: boolean = true
  data$ = combineLatest([this.loadMore$, this.filter$]).pipe(
    switchMap(([loadMore, filter]) => this.examsService.getExams({ ...filter }, loadMore)),
    tap(async (res) => {
      this.exams = this.exams.concat(res.dataRes)
      this.canLoadMore = res.dataCount / this.exams.length > 0 ? true : false
    }))


  constructor(public examsService: ExamsService, private router: Router, public ls: LanguageService) {
    this.filter = {}
  }


  // ltop = 0
  // threshold = 30;
  // lastPage = 0
  // page = 1
  // pageChange!: Observable<{ page: number, dir: 1 | -1 } | undefined>
  pageChange!: Observable<boolean | undefined>
  ngAfterViewInit(): void {

    const container = document.getElementsByClassName('mat-drawer-content').item(0) as HTMLElement
    this.pageChange = fromEvent(container, 'scroll').pipe(debounceTime(100), takeUntil(this.destroyed$),
      map((e: any & Event) => {
        // if (this.ltop === e.srcElement.scrollTop) return

        // const dir = e.srcElement.scrollTop > this.ltop ? 1 : -1
        // const page = Math.floor(e.srcElement.scrollTop / this.threshold)
        // this.ltop = e.srcElement.scrollTop

        // return { page, dir }
        const top = e.srcElement.scrollTop
        const height = e.srcElement.scrollHeight
        const offset = e.srcElement.offsetHeight

        if (top > height - offset - 1) {
          return true
        }
        return false
      }))


    this.pageChange.pipe(filter(p => p === true && this.canLoadMore)).subscribe(async p => {
      this.loadMore$.next(true)
    })
  }

  async updateData(next?: boolean) {
    let res
    if (next) res = await this.examsService.getExams(this.filter, next)

    else res = await this.examsService.getExams(this.filter)

    this.exams = this.exams.concat(res.dataRes)
  }

  ngOnInit(): void {

  }
  showDetails(examId: string) {
    this.router.navigate([`/${this.ls.language ?? this.ls.defaultLang}/exam/${examId}`])
  }

  search(q: { by: string | undefined, text: string | undefined }) {
    if (q.by) {
      this.exams = []
      this.filter = { q: q }
      this.filter$.next(this.filter)

    }
  }


}
