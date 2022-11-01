import { Component, OnInit } from '@angular/core';
import { LanguageService } from '@upupa/language';
import { AuthService } from 'src/app/features/membership/services/auth.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  constructor(public auth: AuthService, public ls: LanguageService) { }

  ngOnInit(): void {
  }

}
