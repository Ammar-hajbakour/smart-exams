import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Exam } from 'src/app/models/exam.model';

export type ActionDescriptor = { name: string, text?: string, icon?: string, variant: 'icon' | 'button' }
@Component({
  selector: 'app-exams-list',
  templateUrl: './exams-list.component.html',
  styleUrls: ['./exams-list.component.scss']
})
export class ExamsListComponent implements OnInit {

  @Output() elementAction = new EventEmitter<{ element: any, action: string }>()
  @Input() actions: ActionDescriptor[] = []

  @Input() columns: { prop: string, display: string }[] = [
    { display: 'Exam Name', prop: 'name' },
    { display: 'Category', prop: 'category' },
    { display: 'Duration', prop: 'duration' },
    { display: 'Pass Degree', prop: 'passDegreePercentage' },
  ]
  get displayedColumns() { return this.actions.length ? [...this.columns.map(c => c.display), 'Actions'] : this.columns.map(c => c.display) }


  data$ = new ReplaySubject<Partial<Exam>[]>(1)
  private _data: Partial<Exam>[] | null = [];
  @Input()
  public get data(): Partial<Exam>[] | null {
    return this._data;
  }
  public set data(v: Partial<Exam>[] | null) {
    this._data = v;
    this.data$.next(this.data ?? [])
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  emitAction(element: any, action: string) {
    this.elementAction.emit({ action, element })

  }

}
