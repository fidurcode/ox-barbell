import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../interfaces/user.model';
import { Subject, takeUntil } from 'rxjs';
import { RegisterUser } from '../interfaces/register-user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy {
  loginForm: FormGroup;
  registerForm: FormGroup;

  isRegisterMode = false;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.isRegisterMode = this.router.url.includes('register');

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnDestroy(): void {
    this.destroy$.unsubscribe();
  }

  onLogin(): void {
    if (this.loginForm?.valid) {
      this.sendLoginForm(this.loginForm);
    }
  }

  onRegister(): void {
    if (this.registerForm?.valid) {
      this.sendRegisterForm(this.registerForm);
    }
  }

  private setTokenInLocalStorage(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  private sendLoginForm(loginForm: FormGroup): void {
    this.authService
      .login(loginForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (user: User) => {
          if (user) {
            const authToken = `Bearer ${user.accessToken}`;
            this.setTokenInLocalStorage(authToken);
            this.authService.isAuthenticated = true;
            this.redirectToDashboard();
          }
        },
      });
  }

  private sendRegisterForm(form: FormGroup): void {
    this.authService
      .register(form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (registeredUser: RegisterUser) => {
          if (registeredUser) {
            // @TODO przekierowanie na komponent z informacją, że wysłaliśmy maila z potwierdzeniem konta..
            /**
             * @TODO Na Twój adres email wysłaliśmy wiadomość. Potwierdź konto aby korzystać z naszego serwisu.
             */

            // tymczasowo przekieruję na stronę logowanie
            this.router.navigate(['app/login']);
          }
        },
      });
  }

  private redirectToDashboard(): void {
    this.router.navigate(['app/dashboard']).then();
  }
}
