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
export class ResponsesListComponent implements OnInit {

  @Output() elementAction = new EventEmitter<{ element: any, action: ActionDescriptor }>()
  @Input() actions: ActionDescriptor[] = []

  @Input() columns: { prop: string, display: string }[] = [
    { display: 'Exam', prop: 'examName' },
    { display: 'Date', prop: 'date' },
    { display: 'Status', prop: 'status' },

  ]
  get displayedColumns() { return this.actions.length ? [...this.columns.map(c => c.display), 'Actions'] : this.columns.map(c => c.display) }
  data$ = new ReplaySubject<ExamResponse[]>(1)

  constructor(private responseService: ExamResponsesService, private auth: AuthService) {

  }

  async ngOnInit(): Promise<void> {
    await this.getUserResponses()
  }
  async getUserResponses() {
    const userResponses = await this.responseService.listUserResponses(this.auth.user.id)
    this.data$.next(userResponses)
  }
  emitAction(element: any, action: ActionDescriptor) {
    this.elementAction.emit({ action, element })

  }

}
