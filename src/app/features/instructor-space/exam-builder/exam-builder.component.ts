import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, of, switchMap } from 'rxjs';
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

  exam$ = this.route.params.pipe(
    switchMap((ps) => {
      if (ps['id']) return this.examsService.getExamById(ps['id'])
      else return []
    }),
    map((exam: Exam) => {
      if (exam) {
        this.questions = exam.questions

        this.active = this.questions[0]
      }

      return exam
    }))
  constructor(private route: ActivatedRoute, private examsService: ExamsService) {

  }

  addQuestion(array: Array<Question>) {
    array.push(new Question())
    this.active = array[array.length - 1]

  }
  addOption(q: Question) {

    q.choices.push({ display: '', value: '' })
  }
  setOption(e: any, choice: { display: string, value: string | number }) {
    choice.value = e.data
    console.log(e.data);

  }
  deleteItemFrom(array: Array<any>, index: number) {
    array.splice(index, 1)
  }
  save(form: NgForm) {
    if (form.valid) {
      // this.questions = form.value
      // this.examsService.save(form.value)
      console.log(this.questions);

    }
  }
  ngOnInit(): void {
    this.exam$.subscribe(res => console.log(res)
    )
  }

}
