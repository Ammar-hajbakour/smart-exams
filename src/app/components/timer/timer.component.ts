import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { BehaviorSubject, filter, finalize, interval, map, of, startWith, switchMap, takeWhile, tap } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent {
  @Input() startTime!: number;
  @Input() endTime!: number

  @Output() timeOut = new EventEmitter()


  private _start!: boolean;
  @Input()
  public get start(): boolean {
    return this._start;
  }

  public set start(v: boolean) {
    this._start = v;
    this.started$.next(v)
  }


  started$ = new BehaviorSubject<boolean>(false)

  remainTime$ = this.started$.pipe(
    switchMap(status => {
      if (!status) return of(0)
      else return interval(1000).pipe(
        startWith(diffTime(Date.now(), this.endTime)),
        takeWhile(() => Math.max(0, this.endTime - Date.now()) > 0),
        map(() => diffTime(Date.now(), this.endTime)),
        finalize(() => this.timeOut.emit(true)))
    })
  )
}
export function diffTime(d1: number, d2: number): Date {
  let delta = (d2 - d1) / 1000
  delta -= Math.floor(delta / 86400) * 86400
  var hours = Math.floor(delta / 3600) % 24
  delta -= hours * 3600
  var minutes = Math.floor(delta / 60) % 60
  delta -= minutes * 60
  var seconds = delta % 60
  return new Date(0, 0, 0, hours, minutes, seconds)
}