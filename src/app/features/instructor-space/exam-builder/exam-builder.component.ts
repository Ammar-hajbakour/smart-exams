import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, of, switchMap } from 'rxjs';
import { Exam } from 'src/app/models/exam.model';
import { ExamsService } from 'src/app/shared/exams.service';

@Component({
  selector: 'app-exam-builder',
  templateUrl: './exam-builder.component.html',
  styleUrls: ['./exam-builder.component.scss']
})
export class ExamBuilderComponent implements OnInit {
  questions: any[] = new Array(1).fill(1).map(x => ({}))
  answers: any[] = new Array(1).fill(1).map(x => ({}))
  active = null

  exam$ = this.route.params.pipe(
    switchMap(ps => {
      if (ps['id']) return this.examsService.getExamById(ps['id'])
      else return of(null)
    }),
    map(exam => {
      if (exam) {
        this.questions = exam.questions
        this.active = this.questions[0]
      }

      return exam
    }))
  constructor(private route: ActivatedRoute, private examsService: ExamsService) {
    this.setStep(1)
  }
  step = 0;
  addItemTo(array: Array<any>) {
    array.push(array.length + 1)
    this.active = array[array.length - 1]
  }
  deleteItemFrom(array: Array<any>, index: number) {
    array.splice(index, 1)
  }
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;

  }

  prevStep() {
    this.step--;
  }
  ngOnInit(): void {

  }

}
