import { Component, OnInit } from '@angular/core';
import { StudentService } from '../service/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../model/course';
import { CommonModule } from '@angular/common';
import { CourseResponse } from '../model/course-response';

@Component({
  selector: 'app-electivecourse-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './electivecourse-selection.component.html',
  styleUrl: './electivecourse-selection.component.css'
})
export class ElectivecourseSelectionComponent implements OnInit {

  studentId !: number | null
  yearOfStudy !: number
  courses: Course[] = [];
  selectedCourse !: Course | null
  Message: string | null = null;

  constructor(private studentService: StudentService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.studentId = +params['studentId'];
      this.yearOfStudy = +params['yearOfStudy'];
    })
    this.loadElectiveCourses(this.yearOfStudy);
  }

  loadElectiveCourses(yearOfStudy: number): void {
    this.studentService.getE_courseForStudent(yearOfStudy).subscribe(courses =>
      this.courses = courses
    )
  }

  OnCourseSelect(course: Course) {
    this.selectedCourse = course;
}

  submitSelectedCourse() {
    const courseResponse: CourseResponse = {
      studId: this.studentId!,
      courseId: this.selectedCourse!.id
    };
    console.log(courseResponse);
    this.studentService.submitCourseSelection(courseResponse)
      .subscribe(response => {
        this.Message = response;
        setTimeout(() => {
          this.Message = null; // Clear message
          this.router.navigate(['/student-profile', this.studentId]);
        }, 1500);
      },
      error => {
          this.Message = "Something went Wrong !"
        }
      )
  }
}



