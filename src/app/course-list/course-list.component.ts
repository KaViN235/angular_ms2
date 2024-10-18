import { Component, OnInit } from '@angular/core';
import { StudentService } from '../service/student.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../model/course';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {

  studentId !: number | null 
  courses : Course[] = [];
  constructor(private studentService : StudentService, private route : ActivatedRoute){}

  ngOnInit(): void {
    this.studentId = +this.route.snapshot.paramMap.get('studentId')!;
    this.loadCourseDetail(this.studentId);

  }

  loadCourseDetail(studentId: number) : void {
    this.studentService.getCoursesByStudentId(studentId).subscribe(courses =>{
      this.courses = courses
    });
    console.log(this.courses);
  }

}
 

