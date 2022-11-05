import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from '@upupa/language';
import { switchMap, tap, Observable, throwError, filter, combineLatest, map, ReplaySubject } from 'rxjs';
import { Exam, Question } from 'src/app/models/exam.model';
import { ExamResponse } from 'src/app/models/response.model';
import { ExamResponsesService } from 'src/app/shared/exam-responses.service';

import { ExamsService } from 'src/app/shared/exams.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../membership/services/auth.service';

@Component({
  selector: 'app-collector',
  templateUrl: './collector.component.html',
  styleUrls: ['./collector.component.scss']
})
export class CollectorComponent {

  disabled = false
  active: Question | null = null
  exam!: Exam
  response!: ExamResponse
  exam$: Observable<Exam> = combineLatest([this.route.params, this.auth.user$]).pipe(
    filter(([ps, user]) => ps['exam'] != this.exam?.id),
    switchMap(([ps, user]) => this.examsService.getExamById(ps['exam'])),
    tap((exam: any) => this.exam = exam),
    switchMap(exam => this.responsesService.getUserResponse(this.auth.user.id, this.exam.id)),
    tap((response: ExamResponse) => {
      if (response && response.startTime) {
        const left = ((response.endTime ?? Date.now()) - response.startTime) / 60000
        if (response.endTime || (response.status !== 'finished' && this.exam.duration <= left))
          throwError(() => new Error('Can not retake this exam!'))

        this.response = response
        if (!response.endTime) this.startAnswer()
        else this.disabled = true
      }
      else {
        this.response = new ExamResponse(this.auth.user.id, this.exam.id, this.exam.instructorId)
        this.response.instructor = this.exam.instructorName
        this.response.examName = this.exam.name
        this.response.userName = this.auth.user.name
        this.exam.questions.forEach(q => this.response.answers[q.id] = [])

      }

    }),
    map(() => {
      const exam = { ...this.exam }
      if (exam.shuffle === true) {
        exam.questions = this.exam.questions.sort((q1, q2) => Math.random() - Math.random())
        exam.questions.forEach(q => q.choices.sort((q1, q2) => Math.random() - Math.random()))
      }

      return exam
    })
  )
  stopTime: number | null = null;
  resultShow: boolean = false;
  constructor(
    private responsesService: ExamResponsesService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private examsService: ExamsService,
    public ls: LanguageService
  ) { }


  async timeOut() {
    //alert time out
    if (!this.disabled || !this.response.endTime) await this.submit()
  }

  async answerChange(q: Question, choice: { value: string | number, display: string }, event: any) {
    if (this.disabled) return

    let value = (this.response.answers[q.id] ?? [])
    if (event.checked) value.push(choice.value)
    else value = value.filter(v => v !== choice.value)

    this.response.answers[q.id] = value

    await this.save();

  }
  async save() {
    if (this.disabled) return
    if (this.response.id)
      await this.responsesService.updateResponse(this.response.id, { answers: this.response.answers });
    else {
      const { id } = await this.responsesService.createResponse({ ...this.response });
      this.response.id = id;
    }
  }

  async startAnswer() {
    if (!this.response.startTime) this.response.startTime = Date.now()
    this.stopTime = this.response.startTime + (this.exam.duration * 60000)


    if (environment.production && !this.response.id) await this.save();
  }

  async submit() {
    // disable collector form and submit directly and show submitting indicator
    // when submittion is don show any message to tell user.
    this.disabled = true
    this.response.endTime = Date.now()
    this.stopTime = this.response.endTime
    this.response.status = 'finished'




    const cas = this.exam.correctAnswers
    const userPoints = Object.getOwnPropertyNames(this.response.answers).map(qid => {
      const questionCorrectAnswers = cas[qid]
      const userCorrectAnswers = questionCorrectAnswers.filter(qca => this.response.answers[qid].indexOf(qca) > -1).length
      const question = this.exam.questions.find(q => q.id === +qid) as Question
      const questionPoints = (question?.points) ?? 1
      const qChoicePoints = questionPoints / (question?.choices ?? [0]).length

      if (this.response.answers[qid].length === userCorrectAnswers && userCorrectAnswers === questionCorrectAnswers.length) return question?.points ?? 1
      else {
        if (question.calcStrategy === 'count-all') {
          return qChoicePoints * (userCorrectAnswers - (this.response.answers[qid].length - userCorrectAnswers))
        }
        else return 0
      }
    }).reduce((p1, p2) => p1 + p2, 0)

    const total = this.exam.questions.map(q => q.points ?? 1).reduce((p1, p2) => p1 + p2, 0)
    this.response.result = 100 * userPoints / total



    await this.responsesService.updateResponse(this.response.id, {
      endTime: this.response.endTime,
      status: this.response.status,
      answers: this.response.answers,
      result: this.response.result,
      passDegreePercentage: this.exam.passDegreePercentage

    })

    this.resultShow = true

  }
}