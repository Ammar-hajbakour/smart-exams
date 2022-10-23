import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LanguageService } from '@upupa/language';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { Exam } from 'src/app/models/exam.model';
import { ExamsService } from 'src/app/shared/exams.service';
import { AuthService } from '../../membership/services/auth.service';
import { ExamFormComponent } from '../exam-form/exam-form.component';

@Component({
  selector: 'app-instructor-exams-page',
  templateUrl: './instructor-exams-page.component.html',
  styleUrls: ['./instructor-exams-page.component.scss']
})
export class InstructorExamsPageComponent implements OnInit {

  actions = ['view', 'edit', 'build', 'changeStatus', 'delete']

  exams = new BehaviorSubject<Partial<Exam>[]>([])

  constructor(
    private examsService: ExamsService,
    private router: Router,
    private ls: LanguageService,
    public dialog: MatDialog, private auth: AuthService) { }

  async ngOnInit(): Promise<void> {
    const _exams = await this.examsService.getExams()
    this.exams.next(_exams)

  }


  async addExam() {
    const result = await firstValueFrom(this.dialog.open(ExamFormComponent, {
      data: { instructorId: this.auth.user.id }
    }).afterClosed());

    if (result) {
      //after close dialog refresh list

      this.exams.next([...this.exams.value, result])
    }
  }

  onAction(e: { action: string, element: Partial<Exam> }) {
    console.log(e);

    switch (e.action) {
      case 'build': this.router.navigate(['/', this.ls.language, 'instructor', 'build', e.element.id]);
        break;
    }
  }
}
