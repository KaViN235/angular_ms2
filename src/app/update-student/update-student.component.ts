import { Component, OnInit } from '@angular/core';
import { StudentService } from '../service/student.service';
import { Student } from '../model/student';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-student',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './update-student.component.html',
  styleUrl: './update-student.component.css'
})
export class UpdateStudentComponent implements OnInit {

  studentId !: number;
  student: Student | null = null;
  orginalStudent: Student | null = null;
  constructor(private studentService: StudentService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.studentId = +params['studentId'];
      this.loadStudentDetail(this.studentId);
    })

  }
  loadStudentDetail(studentId: number): void {
    this.studentService.getStudentById(studentId).subscribe(student => {
      this.student = student;
      this.orginalStudent = JSON.parse(JSON.stringify(student));
    })
  }

  updateSubmit() {
    if (JSON.stringify(this.orginalStudent) === JSON.stringify(this.student)) {
      console.log("NO changes")
      return
    }
      this.studentService.updateStudent(this.student!.id, this.student!).subscribe(response => {
        console.log(response);
      },
        (error) => {
          console.log(error)
        }
      );

  }
}