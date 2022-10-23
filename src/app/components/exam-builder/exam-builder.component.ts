import { Component, OnInit } from '@angular/core';
import { Exam } from 'src/app/models/exam.model';

@Component({
  selector: 'app-exam-builder',
  templateUrl: './exam-builder.component.html',
  styleUrls: ['./exam-builder.component.scss']
})
export class ExamBuilderComponent implements OnInit {
  exam: Exam = new Exam('', '');
  questions: number[] = new Array(1).fill(1)
  answers: number[] = new Array(1).fill(1)

  constructor() {
    this.setStep(1)
  }
  step = 0;
  addItemTo(array: Array<any>) {
    array.push(array.length + 1)
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
