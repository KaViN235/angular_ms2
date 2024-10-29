import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe((response) => {
      if (response) {
        // Redirect based on role
        if (response.role === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else if (response.role === 'student') {
          this.router.navigate([`/student-profile/${response.studentId}`]);
        }
      } else {
        this.errorMessage = 'Invalid credentials';
      }
    });
  }
}