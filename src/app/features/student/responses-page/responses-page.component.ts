import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-responses-page',
  templateUrl: './responses-page.component.html',
  styleUrls: ['./responses-page.component.scss']
})
export class ResponsesPageComponent implements OnInit {
  actions = ['view', 'result', 'continue']

  constructor() { }

  ngOnInit(): void {
  }

  handleUserAction(e: { element: any, action: string }) {
    console.log(e);
  }
}
