import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './interfaces/user.model';
import { UserLoginDto } from './interfaces/dto/user-login.dto';
import { UserRegisterDto } from './interfaces/dto/user-register.dto';
import { RegisterUser } from './interfaces/register-user.model';

@Injectable()
export class AuthService {
  private API_URL = 'http://localhost:4000/';

  public isAuthenticated = false;
  private authSecretKey = 'accessToken';

  constructor(private http: HttpClient) {}

  login(loginData: UserLoginDto): Observable<User> {
    return this.http.post<User>(`${this.API_URL}auth/login`, loginData);
  }

  register(registerData: UserRegisterDto): Observable<RegisterUser> {
    return this.http.post<UserRegisterDto>(
      `${this.API_URL}auth/register`,
      registerData
    );
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  logout(): void {
    localStorage.removeItem(this.authSecretKey);
    this.isAuthenticated = false;
  }
}
