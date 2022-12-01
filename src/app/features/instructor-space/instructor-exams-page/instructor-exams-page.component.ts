import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LanguageService } from '@upupa/language';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { Exam } from 'src/app/models/exam.model';
import { ActionDescriptor } from 'src/app/shared/exams-list/exams-list.component';
import { ExamsService } from 'src/app/shared/exams.service';
import { AuthService } from '../../membership/services/auth.service';
import { ExamFormComponent } from '../exam-form/exam-form.component';

@Component({
  selector: 'app-instructor-exams-page',
  templateUrl: './instructor-exams-page.component.html',
  styleUrls: ['./instructor-exams-page.component.scss']
})
export class InstructorExamsPageComponent implements OnInit {

  actions = [
    { name: 'edit', text: 'Edit Exam info', icon: 'edit', variant: 'icon' } as ActionDescriptor,
    { name: 'build', text: 'Edit Exam questions', icon: 'build', variant: 'icon' } as ActionDescriptor,
    { name: 'changeStatus', text: 'Publish or unpublish', icon: 'published_with_changes', variant: 'icon' } as ActionDescriptor,
    { name: 'delete', text: 'Delete', icon: 'delete', variant: 'icon' } as ActionDescriptor
  ]

  exams = new BehaviorSubject<Partial<Exam>[]>([])

  constructor(
    private examsService: ExamsService,
    private router: Router,
    private ls: LanguageService,
    public dialog: MatDialog, private auth: AuthService) { }

  async ngOnInit(): Promise<void> {
    const _exams = (await this.examsService.getExams()).dataRes
    this.exams.next(_exams)

  }




  async addOrEditExam(examId?: string) {
    const result = await firstValueFrom(this.dialog.open(ExamFormComponent, {
      width: '95%',
      maxWidth: '700px',

      disableClose: true,
      data: { instructorId: this.auth.user.id, examId }
    }).afterClosed());

    if (result) {
      //after close dialog refresh list
      const v = this.exams.value
      if (examId) {
        const idx = v.findIndex(i => i.id === result.id)
        if (idx > -1) v.splice(idx, 1, result)
      }
      else v.push(result)

      this.exams.next([...v])
    }
  }

  async onAction(e: { action: string, element: Partial<Exam> }) {
    console.log(e);

    switch (e.action) {
      case 'build': return this.router.navigate(['/', this.ls.language, 'instructor', 'build', e.element.id]);
      case 'edit': return await this.addOrEditExam(e.element.id)
    }
  }
}
