import { Router } from '@angular/router';
import { UserForRegistration } from './../../_models/UserForRegistration';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from './../../_services/alert.service';
import { AuthService } from './../../_services/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter<boolean>();
  registerForm: FormGroup;
  registerModel: UserForRegistration;

  constructor(private authService: AuthService, private alert: AlertService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  register() {

    this.registerModel = Object.assign({}, this.registerForm.value);

    console.log(this.registerModel);

    this.authService.register(this.registerModel)
      .subscribe(response => {
        console.log(response);
        this.alert.success('Registration successful');

        this.authService.login({ username: this.registerModel.username, password: this.registerModel.password })
          .subscribe(() => {
            this.router.navigate(['/products']);
          });

      }, error => {
        this.alert.error(error);
      });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

  get f() {
    return this.registerForm.controls;
  }

}
