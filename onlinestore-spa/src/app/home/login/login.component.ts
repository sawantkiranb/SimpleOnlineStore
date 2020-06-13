import { AlertService } from './../../_services/alert.service';
import { AuthService } from './../../_services/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  @Output() cancelLogin = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder, private authService: AuthService, private alert: AlertService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {

    const loginModel = this.loginForm.value;

    this.authService.login(loginModel)
      .subscribe(() => {
        this.alert.success('Login successful');
        this.router.navigate(['/products']);
      }, error => {
        this.alert.error(error);
      });
  }

  cancel() {
    this.cancelLogin.emit(false);
  }

}
