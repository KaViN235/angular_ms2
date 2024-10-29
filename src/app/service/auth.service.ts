import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private apiUrl = 'http://localhost:8090/api/login'; // Backend URL
  private tokenKey = 'authToken'; // Key for storing the token

  constructor(private http: HttpClient, private router: Router) { }

  // Check if the user is logged in by verifying if the token exists
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  // Handle login by calling the backend API
  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<any>(this.apiUrl, { username, password }, { headers })
      .pipe(
        map((response) => {
          if (response && response.token) {
            localStorage.setItem(this.tokenKey, response.token); // Store token
            localStorage.setItem('userRole', response.role); // Store role
            if (response.studentId) {
              localStorage.setItem('studentId', response.studentId); // If student, store studentId
            }
          }
          return response;
        }),
        catchError((error) => {
          console.error('Login error', error);
          return of(null); // Return null in case of error
        })
      );
  }

  // Logout: Clear local storage and navigate to login
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('userRole');
    localStorage.removeItem('studentId');
    this.router.navigate(['/login']);
  }

  // Get the current role (either 'admin' or 'student')
  getRole(): string {
    return localStorage.getItem('userRole') || '';
  }

  // Get student ID if logged in as a student
  getStudentId(): string {
    return localStorage.getItem('studentId') || '';
  }
}
