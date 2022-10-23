import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-responses-list',
  templateUrl: './responses-list.component.html',
  styleUrls: ['./responses-list.component.scss']
})
export class ResponsesListComponent implements OnInit {

  @Output() elementAction = new EventEmitter<{ element: any, action: string }>()
  @Input() actions: string[] = []

  @Input() columns: { prop: string, display: string }[] = [
    { display: 'Exam', prop: 'examName' },
    { display: 'Date', prop: 'date' },
    { display: 'Status', prop: 'status' },
  ]
  get displayedColumns() { return this.actions.length ? [...this.columns.map(c => c.display), 'Actions'] : this.columns.map(c => c.display) }
  data$ = new ReplaySubject<any[]>(1)
  constructor() {
    this.data$.next([{ examName: 'Exam', date: new Date(), status: 'Active' }])
  }

  ngOnInit(): void {
  }

  emitAction(element: any, action: string) {
    this.elementAction.emit({ action, element })

  }

}
