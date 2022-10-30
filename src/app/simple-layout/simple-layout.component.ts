import { Component, OnInit } from '@angular/core';
import { LanguageService } from '@upupa/language';

@Component({
  selector: 'app-simple-layout',
  templateUrl: './simple-layout.component.html',
  styleUrls: ['./simple-layout.component.scss']
})
export class SimpleLayoutComponent implements OnInit {

  constructor(public ls: LanguageService) { }

  ngOnInit(): void {
  }

}
