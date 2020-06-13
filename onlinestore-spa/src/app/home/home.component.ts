import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  logIn = false;
  register = false;

  constructor() { }

  ngOnInit() {
  }

  showLogIn() {
    return this.logIn = true;
  }

  showRegister() {
    this.register = true;
  }

  cancelRegister(value: boolean) {
    this.register = value;
  }

  cancelLogin(value: boolean) {
    this.logIn = value;
  }

}
