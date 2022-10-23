import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { Exam } from 'src/app/models/exam.model';
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

  constructor(public dialog: MatDialog, private auth: AuthService) { }

  ngOnInit(): void {
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

  }
}
