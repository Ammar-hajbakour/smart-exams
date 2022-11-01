import { Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { ExamResponse } from 'src/app/models/response.model';
import { ExamResponsesService } from 'src/app/shared/exam-responses.service';
import { ActionDescriptor } from 'src/app/shared/exams-list/exams-list.component';
import { AuthService } from '../../membership/services/auth.service';

@Component({
  selector: 'app-responses-page',
  templateUrl: './responses-page.component.html',
  styleUrls: ['./responses-page.component.scss']
})
export class ResponsesPageComponent {
  // actions = ['view', 'result', 'continue']
  data$ = this.auth.user$.pipe(switchMap(user => this.responseService.listUserResponses<Partial<ExamResponse>>(user.id)))

  actions = [
    { name: 'view', text: 'View', icon: 'wysiwyg', variant: 'button' } as ActionDescriptor,
    {
      name: 'result', text: 'Result', icon: 'workspace_premium', variant: 'button'
    } as ActionDescriptor,
    { name: 'continue', text: 'Continue', icon: 'play_arrow', variant: 'button' } as ActionDescriptor,
  ]
  constructor(private responseService: ExamResponsesService, private auth: AuthService) { }


  handleUserAction(e: { element: any, action: ActionDescriptor }) {
    console.log(e);
  }
}
