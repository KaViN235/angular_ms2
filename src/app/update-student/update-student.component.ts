import { Component, OnInit } from '@angular/core';
import { StudentService } from '../service/student.service';
import { Student } from '../model/student';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-student',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-student.component.html',
  styleUrl: './update-student.component.css'
})
export class UpdateStudentComponent implements OnInit {

  studentId !: number;
  student : Student | null = null;;
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
    })
  }

  SubmitUpdate() {
    this.studentService.updateStudent(this.student!.id, this.student!).subscribe;
  }
}