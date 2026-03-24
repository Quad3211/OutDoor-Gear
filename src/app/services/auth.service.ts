import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(
    this.getStoredUser(),
  );
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        if (response && response.token) {
          localStorage.setItem('iag_token', response.token);
          localStorage.setItem('iag_user', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
        }
      }),
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData).pipe(
      tap((response) => {
        if (response && response.token) {
          localStorage.setItem('iag_token', response.token);
          localStorage.setItem('iag_user', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
        }
      }),
    );
  }

  logout(): void {
    localStorage.removeItem('iag_token');
    localStorage.removeItem('iag_user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  private getStoredUser(): User | null {
    const userStr = localStorage.getItem('iag_user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  getToken(): string | null {
    return localStorage.getItem('iag_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
