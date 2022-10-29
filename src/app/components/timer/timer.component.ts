import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { BehaviorSubject, finalize, interval, map, switchMap, takeWhile, tap } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnChanges {
  @Input() startTime!: number;
  @Input() duration!: number
  @Input() endTime!: number | null
  @Output() timeOut = new EventEmitter(false)
  stopTime!: number;

  started$ = new BehaviorSubject<boolean>(false)

  remainTime$ = interval(1000).pipe(
    takeWhile(() => this.started$.value === true && Math.max(0, this.stopTime - Date.now()) > 0),
    map(() => diffTime(Date.now(), this.stopTime)), finalize(() => this.timeOut.emit(true)))
  remainTime!: Date
  constructor() { }

  ngOnInit(): void {
    this.startTimer()
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['endTime']) this.stopTimer()
  }
  startTimer() {
    // this.response.startTime = Date.now()
    // this.startTime = Date.now()
    this.stopTime = this.startTime + (this.duration * 60000)
    const left = ((this.endTime ?? Date.now()) - this.startTime) / 60000
    if (this.endTime || this.duration <= left) {
      this.remainTime = this.endTime ? diffTime(this.startTime, this.endTime) : new Date(0)
      return
    }
    this.started$.next(true)
  }
  stopTimer() {
    this.started$.next(false)
  }
}
export function diffTime(d1: number, d2: number): Date {
  let delta = (d2 - d1) / 1000
  delta -= Math.floor(delta / 86400) * 86400
  var hours = Math.floor(delta / 3600) % 24
  delta -= hours * 3600
  var minutes = Math.floor(delta / 60) % 60
  delta -= minutes * 60
  var seconds = delta % 60
  const _ = new Date()
  return new Date(_.getFullYear(), _.getMonth(), _.getDate(), hours, minutes, seconds)
}