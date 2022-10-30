import { Component, OnInit } from '@angular/core';
import { ActionDescriptor } from 'src/app/shared/exams-list/exams-list.component';

@Component({
  selector: 'app-responses-page',
  templateUrl: './responses-page.component.html',
  styleUrls: ['./responses-page.component.scss']
})
export class ResponsesPageComponent implements OnInit {
  // actions = ['view', 'result', 'continue']
  actions = [
    { name: 'view', text: 'View', icon: 'wysiwyg', variant: 'button' } as ActionDescriptor,
    {
      name: 'result', text: 'Result', icon: 'workspace_premium', variant: 'button'
    } as ActionDescriptor,
    { name: 'continue', text: 'Continue', icon: 'play_arrow', variant: 'button' } as ActionDescriptor,
  ]
  constructor() { }

  ngOnInit(): void {
  }

  handleUserAction(e: { element: any, action: ActionDescriptor }) {
    console.log(e);
  }
}
