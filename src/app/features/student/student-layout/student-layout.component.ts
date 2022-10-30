import { Component, OnInit } from '@angular/core';
import { LanguageService } from '@upupa/language';

@Component({
  selector: 'app-student-layout',
  templateUrl: './student-layout.component.html',
  styleUrls: ['./student-layout.component.scss']
})
export class StudentLayoutComponent implements OnInit {

  constructor(public ls: LanguageService) { }

  ngOnInit(): void {
  }

}
