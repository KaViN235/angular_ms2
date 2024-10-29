import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    const expectedRole = route.data['role'];
    const userRole = authService.getRole();

    if (expectedRole === userRole) {
      return true; // Allow access if roles match
    } else {
      // Redirect based on user role
      if (userRole === 'admin') {
        router.navigate(['/admin-dashboard']);
      } else if (userRole === 'student') {
        router.navigate([`/student-profile/${authService.getStudentId()}`]);
      }
      return false;
    }
  } else {
    // If not logged in, redirect to login
    router.navigate(['/login']);
    return false;
  }
};
