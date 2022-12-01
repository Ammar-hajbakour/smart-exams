import { Component, Input, OnInit } from '@angular/core';
import { ExamResponse } from 'src/app/models/response.model';

@Component({
  selector: 'app-reslt',
  templateUrl: './reslt.component.html',
  styleUrls: ['./reslt.component.scss']
})
export class ResltComponent implements OnInit {
  @Input() response!: ExamResponse
  resultMessage: string = ''
  constructor() { }
  setResTxt() {
    console.log(this.response.result);

    const passed = this.response.result >= this.response.passDegreePercentage
    this.response.isPassed = passed
    if (passed) {
      this.resultMessage = `Congrats! You have successfully passed the exam and answered ${this.response.result}% of the questions correctly`
    }
    else this.resultMessage = `You answered ${this.response.result}% of the questions correctly,
        Good Luck in the next time 
    `
  }
  ngOnInit(): void {
    this.setResTxt()
  }

}
