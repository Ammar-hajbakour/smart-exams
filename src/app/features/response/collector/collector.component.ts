import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap, Observable, throwError, filter, combineLatest, of, map } from 'rxjs';
import { Exam, Question } from 'src/app/models/exam.model';
import { ExamResponse } from 'src/app/models/response.model';
import { ExamResponsesService } from 'src/app/shared/exam-responses.service';

import { ExamsService } from 'src/app/shared/exams.service';
import { AuthService } from '../../membership/services/auth.service';

@Component({
  selector: 'app-collector',
  templateUrl: './collector.component.html',
  styleUrls: ['./collector.component.scss']
})
export class CollectorComponent implements OnInit {

  active: Question | null = null
  exam!: Exam
  response!: ExamResponse
  remainingTime!: number
  currentTimer!: number
  timeInt: any
  exam$: Observable<Exam> = combineLatest([this.route.params, this.auth.user$]).pipe(
    filter(([ps, user]) => ps['exam'] != this.exam?.id),
    switchMap(([ps, user]) => this.examsService.getExamById(ps['exam'])),
    tap((exam: Exam) => this.exam = exam),
    switchMap(exam => this.responsesService.getUserResponse(this.auth.user.id, this.exam.id)),
    tap((response: ExamResponse) => {
      if (response) {
        const left = 0.001 * ((response.endTime ?? Date.now()) - response.startTime)
        if (response.status !== 'finished' && this.exam.duration > left) {
          this.response = response
          this.remainingTime = (Date.now() / 1000 / 60) - this.response.startTime
          this.currentTimer = this.remainingTime > 0 ? this.remainingTime : 0
          this.playTimer(this.currentTimer)
          console.log(this.remainingTime, this.currentTimer);

        }
        else throwError(() => new Error('Can not retake this exam!'))
      }
      else this.response = new ExamResponse(this.auth.user.id, this.exam.id)
    }),
    map(() => {
      const res = { ...this.exam }
      if (res.shuffle === true) res.questions = this.exam.questions.sort((q1, q2) => Math.random() - Math.random())
      return res
    })
  )

  constructor(
    private responsesService: ExamResponsesService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private examsService: ExamsService) { }

  ngOnInit(): void {

  }


  async answerChange(q: Question, choice: { value: string | number, display: string }, event: any) {
    let value = (this.response.answers[q.id] ?? [])
    if (event.checked) value.push(choice.value)
    else value = value.filter(v => v !== choice.value)

    this.response.answers[q.id] = value

    if (this.response.id)
      await this.responsesService.updateResponse(this.response.id, { answers: this.response.answers });
    else {
      const { id } = await this.responsesService.createResponse({ ...this.response })
      this.response.id = id
    }
  }

  async submit() {
    this.response.endTime = Date.now()
    this.response.status = 'finished'

    await this.responsesService.updateResponse(this.response.id, {
      endTime: this.response.endTime,
      status: this.response.status,
      answers: this.response.answers
    })

  }
  remain: Date

  setTimer(timeByMinutes: number) {
    this.tHour = Math.floor(timeByMinutes / 60)
    this.tMinute = timeByMinutes % 60
  }
  playTimer(timeByMinutes: number) {
    if (timeByMinutes <= 0) {
      clearInterval(this.timeInt)
      return
    }
    this.setTimer(timeByMinutes)
    this.tSecond = 59
    this.tMinute--
    this.timeInt = setInterval(() => {
      this.tSecond--

      if (this.tMinute === -1) {
        this.tMinute = 59
        this.tHour--
      }
      if (this.tSecond === -1) {
        this.tSecond = 59
        this.tMinute--
      }

      if (this.tHour === 0 && this.tMinute === 0 && this.tSecond === 0) {

        clearInterval(this.timeInt)
      }
    }, 1000)
  }

}
