import { Component, OnInit } from '@angular/core';
import { LanguageService } from '@upupa/language';

@Component({
  selector: 'app-instructor-layout',
  templateUrl: './instructor-layout.component.html',
  styleUrls: ['./instructor-layout.component.scss']
})
export class InstructorLayoutComponent implements OnInit {

  constructor(public ls: LanguageService) { }

  ngOnInit(): void {
  }

}
