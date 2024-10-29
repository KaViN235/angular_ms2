import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { Observable } from 'rxjs';
import { Studentwrapper } from '../model/studentwrapper';
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courseUrl = 'http://localhost:8080/course';

  constructor(private http: HttpClient) { }

  // Create a new course (using courseUrl)
  createCourse(course: Course): Observable<any> {
    return this.http.post(`${this.courseUrl}/create`, course, { responseType: 'text' });
  }

  // Get all courses (using courseUrl)
  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.courseUrl}/getall`);
  }


} 
