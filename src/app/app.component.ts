import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentProfileComponent } from "./student-profile/student-profile.component";
import { HttpClient,HttpClientModule} from '@angular/common/http';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StudentProfileComponent,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'student_management';
}
