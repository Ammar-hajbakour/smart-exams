import { Component, OnInit } from '@angular/core';
import { LanguageService } from '@upupa/language';
import { AuthService } from '../features/membership/services/auth.service';

@Component({
  selector: 'app-simple-layout',
  templateUrl: './simple-layout.component.html',
  styleUrls: ['./simple-layout.component.scss']
})
export class SimpleLayoutComponent implements OnInit {

  constructor(public ls: LanguageService, public auth: AuthService) { }

  ngOnInit(): void {
  }

}
