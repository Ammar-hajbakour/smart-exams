import { Component, Input, OnInit } from '@angular/core';
import { query } from '@firebase/firestore';
import { BehaviorSubject, combineLatest, filter, map, Subject, switchMap, tap } from 'rxjs';
import { Filter } from 'src/app/models/filter.model';
import { ExamResponse } from 'src/app/models/response.model';
import { ExamResponsesService } from 'src/app/shared/exam-responses.service';
import { ExamsService } from 'src/app/shared/exams.service';
import { AuthService } from '../../membership/services/auth.service';

@Component({
  selector: 'app-responses-result-page',
  templateUrl: './responses-result-page.component.html',
  styleUrls: ['./responses-result-page.component.scss']
})
export class ResponsesResultPageComponent implements OnInit {
  data: any[] = []
  filter: Filter = {}
  filter$: BehaviorSubject<Filter> = new BehaviorSubject(this.filter)
  dataCount: number = 0
  canLoadMore!: boolean
  next: boolean = false
  loadMore$ = new BehaviorSubject<boolean>(false)
  data$ = combineLatest([this.loadMore$, this.filter$]).pipe(
    switchMap(([loadMore, filter]) => this.responseService.getResponses({ ...filter }, loadMore)),
    tap(async (res) => {
      this.data = this.data.concat(res.dataRes)
      res.dataCount = res.dataCount - res.dataRes.length
      this.canLoadMore = (res.dataCount) / this.data.length > 0 ? true : false
    })
  )
  // data$ = this.auth.user$.pipe(switchMap(user => this.responseService.getResponses({ instructor: user.id })))
  constructor(private auth: AuthService, private responseService: ExamResponsesService, private examsService: ExamsService) {

  }
  @Input() columns: { prop: string, display: string }[] = [
    { display: 'Username', prop: 'userName' },
    { display: 'Exam', prop: 'examName' },
    { display: 'Result', prop: 'result' },
    { display: 'isPassed', prop: 'isPassed' },
    { display: 'Date', prop: 'endTime' },

  ]
  // @Input() columns: { prop: string, display: string }[] = [
  //   { display: 'Username', prop: 'instructor' },
  //   { display: 'Exam', prop: 'name' },
  //   { display: 'Result', prop: 'passDegreePercentage' },
  //   { display: 'category', prop: 'category' },
  //   // { display: 'Date', prop: 'endTime' },

  // ]
  async ngOnInit(): Promise<void> {



  }

  get displayedColumns() { return this.columns.map(c => c.display) }

  search(q: { by: string | undefined, text: string | undefined }) {
    if (q.by) {
      this.data = []
      this.filter.q = q
      this.filter$.next(this.filter)
    }
  }

  loadMore() {
    this.loadMore$.next(true)
  }

}
