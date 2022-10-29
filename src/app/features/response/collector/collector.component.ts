import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap, Observable, throwError, filter, combineLatest, map } from 'rxjs';
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
export class CollectorComponent {

  active: Question | null = null
  exam!: Exam
  response!: ExamResponse

  exam$: Observable<Exam> = combineLatest([this.route.params, this.auth.user$]).pipe(
    filter(([ps, user]) => ps['exam'] != this.exam?.id),
    switchMap(([ps, user]) => this.examsService.getExamById(ps['exam'])),
    tap((exam: Exam) => this.exam = exam),
    switchMap(exam => this.responsesService.getUserResponse(this.auth.user.id, this.exam.id)),
    tap((response: ExamResponse) => {
      if (response) {
        const left = ((response.endTime ?? Date.now()) - response.startTime) / 60000
        if (response.endTime || (response.status !== 'finished' && this.exam.duration <= left))
          throwError(() => new Error('Can not retake this exam!'))

        this.response = response
      }
      else {
        this.response = new ExamResponse(this.auth.user.id, this.exam.id)
        this.exam.questions.forEach(q => this.response.answers[q.id] = [])
      }

    }),
    map(() => {
      const exam = { ...this.exam }
      if (exam.shuffle === true) exam.questions = this.exam.questions.sort((q1, q2) => Math.random() - Math.random())

      return exam
    })
  )
  stopTime: number | null = null;
  constructor(
    private responsesService: ExamResponsesService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private examsService: ExamsService) { }


  async timeOut() {
    //alert time out
    await this.submit()
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

  startAnswer() {
    this.response.startTime = Date.now()
    this.stopTime = this.response.startTime + (this.exam.duration * 60000)
  }

  async submit() {
    // disable collector form and submit directly and show submitting indicator
    // when submittion is don show any message to tell user.

    this.response.endTime = Date.now()
    this.response.status = 'finished'

    await this.responsesService.updateResponse(this.response.id, {
      endTime: this.response.endTime,
      status: this.response.status,
      answers: this.response.answers
    })
  }
}