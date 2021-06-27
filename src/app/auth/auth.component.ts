import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { authResponse, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;

    let authObs: Observable<authResponse>;

    if (this.isLoginMode) {
      authObs = this.authService.signIn(form.value);
    } else {
      authObs = this.authService.signUp(form.value);
    }

    authObs.subscribe(
      (res) => {
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      (errorMsg) => {
        this.error = errorMsg;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
