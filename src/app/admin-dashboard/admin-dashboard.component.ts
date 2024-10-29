import { Component } from '@angular/core';
import { Course } from '../model/course';
import { Studentwrapper } from '../model/studentwrapper';
import { CommonModule } from '@angular/common';
import { Student } from '../model/student';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../service/student.service';
import { CourseService } from '../service/course.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {


  isSidebarOpen = false
  selectedOption: string = '';
  newStudent: Studentwrapper = { name: '', birthdate: '', address: '', phone_number: '', department: '', dateOfJoining: '' };
  newCourse: Course = { id: 0, name: '', type: '', yearOfStudy: 0, department: '' };
  allCourses: Course[] = [];
  allStudents: Student[] = [];
  selectedStudent: Student | null = null;
  studentIdForSearch: number | null = null;


  constructor(private studentService: StudentService, private courseService: CourseService) { }

  ngOnInit(): void {
    this.getAllStudents();
    this.getAllCourses();

  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen
  }

  selectOption(option: string) {
    this.selectedOption = option
  }
  // Create a new course
  createCourse(): void {
    this.courseService.createCourse(this.newCourse).subscribe(response => {
      console.log(response);
      this.getAllCourses();
      this.newCourse = { id: 0, name: '', type: '', yearOfStudy: 0, department: '' };
    });
  }

  // Get all courses
  getAllCourses(): void {
    this.courseService.getAllCourses().subscribe(courses => {
      this.allCourses = courses;

    });
  }

  // Create a new student
  createStudent(): void {
    this.studentService.createStudent(this.newStudent).subscribe(response => {
      console.log('Student created:', response);
      this.newStudent = { name: '', birthdate: '', address: '', phone_number: '', department: '', dateOfJoining: '' };
    });
  }

  // Search student by ID
  searchStudent(): void {
    if (this.studentIdForSearch) {
      this.studentService.getStudentById(this.studentIdForSearch).subscribe(student => {
        this.selectedStudent = student;
      });
    }
  }
  getAllStudents(): void {
    this.studentService.getAllStudents().subscribe(students => {
      this.allStudents =  students;
    });
  }

}
