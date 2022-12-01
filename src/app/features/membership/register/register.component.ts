import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LanguageService } from '@upupa/language'




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  duration = { duration: 3000 }
  userForm!: UntypedFormGroup;
  registering: boolean = false
  constructor(private fb: UntypedFormBuilder,
    private ls: LanguageService,
    private router: Router,
    public route: ActivatedRoute,
    private auth: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.creatUserForm()
  }

  creatUserForm() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      type: ['student', [Validators.required]]
    });
  }

  async submit() {
    const user = this.userForm.value
    user.name = user.name.toLocaleLowerCase()
    user.email = user.email.toLocaleLowerCase()
    const password = user.password
    if (user.password !== user.confirmPassword) {
      this.snackBar.open('Error!, Password Comfirming faild', 'Registration', this.duration)
      return
    }
    this.registering = true
    const payload = { ...user }
    delete payload.password
    delete payload.confirmPassword
    try {
      await this.auth.createUser(payload, password)
      const redirect = this.route.snapshot.queryParams['redirect'] || `/${this.ls.language}`
      this.router.navigateByUrl(redirect)
      this.snackBar.open('Congratulations!, Regiter done successfully', 'Registration', this.duration)
    } catch (err) {
      this.snackBar.open('Error', 'Registration', this.duration)
    }
    finally {
      this.registering = false
    }
  }
}
