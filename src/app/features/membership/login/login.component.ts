import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '@upupa/language'
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  duration = { duration: 3000 }
  loginForm!: UntypedFormGroup;
  logingin: boolean = false
  constructor(private ls: LanguageService,
    private fb: UntypedFormBuilder,
    public snackBar: MatSnackBar,
    public auth: AuthService,
    private router: Router,
    public route: ActivatedRoute
  ) { }

  creatLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  setUserType(e: any) {
    this.auth.user.type = e.value
  }

  async submit() {
    this.logingin = true
    const user = this.loginForm.value
    try {
      await this.auth.login(user)
      this.snackBar.open(`Congratulations!, Welcome ${this.auth.user.name}! You signed in successfully`, 'Log in', this.duration)
      const redirect = this.route.snapshot.queryParams['redirect'] || `/${this.ls.language}`
      this.router.navigateByUrl(redirect)

    }
    catch (err) {
      // this.toaster.danger('Error', err.message)
      this.snackBar.open('Error!', 'Log in', this.duration)
    }
    finally {
      this.logingin = false
    }

  }

  ngOnInit(): void {
    this.creatLoginForm()
  }
}