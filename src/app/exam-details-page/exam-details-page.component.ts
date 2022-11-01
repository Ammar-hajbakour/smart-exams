import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '@upupa/language';
import { Observable, ReplaySubject, switchMap, tap, throwError } from 'rxjs';
import { AuthService } from '../features/membership/services/auth.service';
import { Exam } from '../models/exam.model';
import { ExamsService } from '../shared/exams.service';

@Component({
  selector: 'app-exam-details-page',
  templateUrl: './exam-details-page.component.html',
  styleUrls: ['./exam-details-page.component.scss']
})
export class ExamDetailsPageComponent implements OnInit {

  exam$: Observable<Exam> = this.route.params.pipe(
    switchMap((ps) => {
      if (!ps['id']) return throwError(() => new Error('Exam Id should be provided!'))
      return this.examsService.getExamById(ps['id'])
    })
    ,
    tap((exam: any) => exam)
  )
  constructor(private route: ActivatedRoute, private examsService: ExamsService, public auth: AuthService, private router: Router, private ls: LanguageService) { }

  ngOnInit(): void {
  }
  subscribe(examId: string) {
    this.router.navigate([`/${this.ls.language}/response/answer/${examId}`])
  }
}
