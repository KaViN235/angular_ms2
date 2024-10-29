import { Routes } from '@angular/router';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { CourseListComponent } from './course-list/course-list.component';
import { ElectivecourseSelectionComponent } from './electivecourse-selection/electivecourse-selection.component';
import { UpdateStudentComponent } from './update-student/update-student.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    // { path: 'login', component: LoginComponent },
    { path: 'admin-dashboard', component: AdminDashboardComponent },
    { path: 'student-profile/:studentId', component: StudentProfileComponent },
    { path: 'courses/:studentId', component: CourseListComponent },
    // { path: '', redirectTo: '/login', pathMatch: 'full' },
    // { path: '**', redirectTo: '/login' },
    { path: 'select-elective', component: ElectivecourseSelectionComponent },
    { path: 'update-student/:studentId', component: UpdateStudentComponent },
];
