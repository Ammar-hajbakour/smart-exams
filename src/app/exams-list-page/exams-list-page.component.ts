import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import { Exam } from '../models/exam.model';
import { ExamsService } from '../shared/exams.service';
@Component({
  selector: 'app-exams-list-page',
  templateUrl: './exams-list-page.component.html',
  styleUrls: ['./exams-list-page.component.scss'],
})
export class ExamsListPageComponent implements OnInit {

  constructor(public examsService: ExamsService) { }

  exams: Exam[] = []

  categories: Array<{ string: Exam[] }> = []
  @ViewChild(MatPaginator) paginator!: MatPaginator;



  async ngOnInit() {
    this.exams = await this.examsService.getExams()
  }
}
