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
  correctAnswers: string[] = []
  active: any

  exam!: Exam
  exam$: Observable<Exam> = this.route.params.pipe(
    switchMap((ps) => {
      if (!ps['id']) return throwError(() => new Error('Exam Id should be provided!'))
      return this.examsService.getExamById(ps['id'])
    }),
    tap((exam: Exam) => {
      if (exam) {
        this.exam = exam
        this.questions = exam.questions
        this.active = this.questions[0]
      }
    }))
  constructor(private route: ActivatedRoute, private examsService: ExamsService) {

  }

  changeChoiceValue(c: any, e: any) {
    c.display = e.target.value
  }
  addQuestion(array: Array<Question>) {
    array.push(new Question())
    this.active = array[array.length - 1]

  }



  addOption(q: Question) {
    q.choices.push({ display: '', value: makeid() })
  }

  deleteItemFrom(array: Array<any>, index: number) {
    array.splice(index, 1)
  }

  async save() {
    await this.examsService.updateExamQuestions(this.exam.id, this.questions)
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