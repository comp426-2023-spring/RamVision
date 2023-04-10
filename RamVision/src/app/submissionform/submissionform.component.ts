import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-submissionform',
  templateUrl: './submissionform.component.html',
  styleUrls: ['./submissionform.component.css']
})
export class SubmissionFormComponent {
  years = [2023, 2022, 2021, 2020, 2019, 2018]; // add years as needed
  formData = {
    class: '',
    academicTerm: '',
    year: '',
    professor: '',
    gradeReceived: null
  };

  // Http client for sending requests etc.
  constructor(private http: HttpClient) {}

  // SubmitForm builds url and returns observable http req, it is called inside onSubmit
  submitForm() {
    // Create a JSON object from the form data
    const submissionData = {
      class: this.formData.class,
      academicTerm: this.formData.academicTerm,
      year: this.formData.year,
      professor: this.formData.professor,
      gradeReceived: this.formData.gradeReceived
    };
    
    // For testing
    console.log(submissionData);
    
    // Building the URL from the JSON
    const url = `https://ramvision-ecaa0-default-rtdb.firebaseio.com/${submissionData.year}/${submissionData.academicTerm}/${submissionData.class}/${submissionData.professor}.json`;

    // Make PUT call
    return this.http.put(url, submissionData);
  }

  // onSubmit is what is tied to the front end button click, it will observe and tell us if successful or not
  onSubmit() {
    this.submitForm().subscribe(
      res => {
        console.log('Data successfully updated in Firebase!');
        console.log(res);
      },
      err => {
        console.log('Error updating data in Firebase:');
        console.log(err);
      }
    );
  }

}