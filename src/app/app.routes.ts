import { Routes } from '@angular/router';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { CourseListComponent } from './course-list/course-list.component';
import { ElectivecourseSelectionComponent } from './electivecourse-selection/electivecourse-selection.component';
import { UpdateStudentComponent } from './update-student/update-student.component';

export const routes: Routes = [
    { path: 'student-profile/:studentId', component: StudentProfileComponent },
    { path: 'student-profile', component: StudentProfileComponent },
    { path: 'courses/:studentId', component: CourseListComponent },
    { path: 'select-elective', component: ElectivecourseSelectionComponent },
    { path: 'update-student/:studentId', component:UpdateStudentComponent},
    { path: '', redirectTo: '/student-profile', pathMatch: 'full' }
];
