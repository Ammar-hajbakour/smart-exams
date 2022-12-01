import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';
import { Exam } from 'src/app/models/exam.model';
import { ExamsService } from '../exams.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnDestroy {

  private _search: { by: string | undefined, text: string | undefined } = { by: 'examName', text: '' };
  @Input()
  public get search(): { by: string | undefined, text: string | undefined } {
    return this._search;
  }
  public set search(v: { by: string | undefined, text: string | undefined }) {
    this._search = v;
  }

  @Input() debounce: number = 250
  @Output() change = new EventEmitter<{ by: string | undefined, text: string | undefined }>()

  change$ = new Subject<{ by: string | undefined, text: string | undefined }>();

  sub!: Subscription
  constructor() {
    this.sub = this.change$
      .subscribe(s => {
        this.search = s
        this.change.emit(s)
      })
  }

  _change(e: any) {
    this.search.text = e.target.value ?? ''
    this.change$.next(this.search)
  }
  ngOnDestroy() {
    this.sub?.unsubscribe()
  }
}
