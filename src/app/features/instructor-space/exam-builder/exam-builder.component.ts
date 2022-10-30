import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { tap, Observable, of, switchMap, throwError } from 'rxjs';
import { Exam, Question } from 'src/app/models/exam.model';
import { ExamsService } from 'src/app/shared/exams.service';

@Component({
  selector: 'app-exam-builder',
  templateUrl: './exam-builder.component.html',
  styleUrls: ['./exam-builder.component.scss']
})
export class ExamBuilderComponent implements OnInit {

  questions: Question[] = []
  // exam: Exam = new Exam()
  correctAnswers: { [questionId: string]: (string | number)[] } = {}
  active: any

  exam!: Exam
  exam$: Observable<Exam> = this.route.params.pipe(
    switchMap((ps) => {
      if (!ps['id']) return throwError(() => new Error('Exam Id should be provided!'))
      return this.examsService.getExamById(ps['id'])
    }),
    tap((exam: any) => {
      if (exam) {
        this.exam = exam
        this.questions = exam.questions
        this.active = this.questions[0]
        this.questions.forEach(q => this.correctAnswers[q.id] = this.exam.correctAnswers?.[q.id] ?? [])
      }
    }))
  constructor(private route: ActivatedRoute, private examsService: ExamsService) {

  }

  changeChoiceValue(c: any, e: any) {
    c.display = e.target.value
  }
  async addQuestion(array: Array<Question>) {
    array.push(new Question())
    this.active = array[array.length - 1]
    this.correctAnswers[this.active.id] = []
    await this.saveQuestions()
  }


  async setCorrectAnswer(q: any, choice: any, value: any) {
    if (value.checked) {
      this.correctAnswers[q.id].push(choice.value)
    }
    else this.correctAnswers[q.id] = this.correctAnswers[q.id].filter(v => v !== choice.value)
    await this.updateCorrectAnswers()
  }
  addOption(q: Question) {
    q.choices.push({ display: '', value: makeid() })
  }

  deleteItemFrom(array: Array<any>, index: number) {
    array.splice(index, 1)
  }

  async saveQuestions() {
    await this.examsService.update(this.exam.id, { questions: this.questions })
  }
  async updateCorrectAnswers() {
    await this.examsService.update(this.exam.id, { correctAnswers: this.correctAnswers })
  }
  ngOnInit(): void {
    this.exam$.subscribe(e => this.exam = e)
  }

}


function makeid(length: number = 8) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}