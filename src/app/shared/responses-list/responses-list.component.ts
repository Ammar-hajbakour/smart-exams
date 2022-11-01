import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { AuthService } from 'src/app/features/membership/services/auth.service';
import { ExamResponse } from 'src/app/models/response.model';
import { ExamResponsesService } from '../exam-responses.service';
import { ActionDescriptor } from '../exams-list/exams-list.component';

@Component({
  selector: 'app-responses-list',
  templateUrl: './responses-list.component.html',
  styleUrls: ['./responses-list.component.scss']
})
export class ResponsesListComponent {

  @Output() elementAction = new EventEmitter<{ element: any, action: ActionDescriptor }>()
  @Input() actions: ActionDescriptor[] = []

  data$ = new ReplaySubject<Partial<ExamResponse>[]>(1)
  private _data: Partial<ExamResponse>[] | null = [];

  @Input()
  public get data(): Partial<ExamResponse>[] | null {
    return this._data;
  }
  public set data(v: Partial<ExamResponse>[] | null) {
    this._data = v;
    this.data$.next(this.data ?? [])
  }

  @Input() columns: { prop: string, display: string }[] = [
    { display: 'Exam', prop: 'examName' },
    { display: 'Date', prop: 'date' },
    { display: 'Status', prop: 'status' },

  ]
  get displayedColumns() { return this.actions.length ? [...this.columns.map(c => c.display), 'Actions'] : this.columns.map(c => c.display) }


  constructor(private responseService: ExamResponsesService, private auth: AuthService) {

  }


  emitAction(element: any, action: ActionDescriptor) {
    this.elementAction.emit({ action, element })

  }

}
