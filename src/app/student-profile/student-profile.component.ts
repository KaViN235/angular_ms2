import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StudentService } from '../service/student.service';
import { Student } from '../model/student';
import { Course } from '../model/course';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CourseListComponent } from '../course-list/course-list.component';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [RouterModule, HttpClientModule, CommonModule],
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.css'
})
export class StudentProfileComponent implements OnInit {

  studentId !: number | null
  student: Student | null = null;
  isRegistered : boolean = true;
  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private cd : ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.studentId = +params['studentId'];
      this.loadStudentDetail(this.studentId);
      // this.isRegistered = false
      
    })
  }

  loadStudentDetail(studentId: number): void {
    this.studentService.getStudentById(studentId).subscribe(student => {
      this.student = student;
      this.checkElective(this.student!.courseIds, this.student!.yearOfStudy);
    })
  }

  checkElective(courseIds: number[], yearOfStudy: number) {
    this.studentService.checkCourseSelection(courseIds, yearOfStudy).subscribe(check => {
     this.isRegistered = check;
    }
    )

  }
  



}
