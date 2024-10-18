import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../model/student';
import { Studentwrapper } from '../model/studentwrapper';
import { HttpClient } from '@angular/common/http';
import { Course } from '../model/course';
import { CourseResponse } from '../model/course-response';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private studentUrl = 'http://localhost:8081/student';


  constructor(private http: HttpClient) { }

  getStudentById(studentId: number): Observable<Student> {
    return this.http.get<Student>(`${this.studentUrl}/get/${studentId}`);
  }

  updateStudent(studentId: number, student: Student): Observable<any> {
    return this.http.put(`${this.studentUrl}/update/${studentId}`, student)
  }

  getCoursesByStudentId(studentId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.studentUrl}/getcourse/${studentId}`);
  }

  getE_courseForStudent(yearOfStudy: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.studentUrl}/get/e-course/${yearOfStudy}`);
  }

  submitCourseSelection(courseResponse: CourseResponse): Observable<any> {
    return this.http.post(`${this.studentUrl}/submit`, courseResponse, { responseType: 'text' });
  }
  checkCourseSelection(courseIds : number[], yearOfStudy: number) : Observable < any > {
    return this.http.post(`${this.studentUrl}/check/e-course/${yearOfStudy}`, courseIds);
  }
}
