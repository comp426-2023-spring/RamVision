import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  majors = ['COMP', 'PHYS', 'MATH'];
  classes = ['CS101', 'EE201', 'ME301'];
  professors = ['Kris Jordan', 'Brent Munsell', 'Shashank Srivastava'];
  terms = ['Fall 2021', 'Spring 2023']

  constructor(private router: Router) {}

  //   goToGradeSubmissionForm() {
  //     this.router.navigateByUrl('/submissionform');
  // }

  logMessage() {
    console.log("works");
  }
}
