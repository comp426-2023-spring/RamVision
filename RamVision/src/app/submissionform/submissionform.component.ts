import { Component } from '@angular/core';

@Component({
  selector: 'app-submissionform',
  templateUrl: './submissionform.component.html',
  styleUrls: ['./submissionform.component.css']
})
export class SubmissionFormComponent {
  years = [2023, 2022, 2021, 2020]; // add years as needed
  professors = ['Professor 1', 'Professor 2', 'Professor 3']; // add professors as needed
  formData = {
    class: '',
    academicTerm: '',
    year: '',
    professor: '',
    gradeReceived: null
  };

  submitForm() {
    // Create a JSON object from the form data
    const submissionData = {
      class: this.formData.class,
      academicTerm: this.formData.academicTerm,
      year: this.formData.year,
      professor: this.formData.professor,
      gradeReceived: this.formData.gradeReceived
    };
    
    // Do something with the submission data
    console.log(submissionData);
 	
    // in order to update the database we make the HTTP PUT call:
    //'https://ramvision-ecaa0-default-rtdb.firebaseio.com/{year}/{academicterm}/{class}/{professor}/.json'
    // with the following json in the data field of the PUT:
    // { "grade" : gradeReceived}
    // where gradeReceived is replaced with the actual data value, and so are {year}/{class}/... etc.  
    const urlString = 'https://ramvision-ecaa0-default-rtdb.firebase.io.com/' + submissionData.year + '/' + submissionData.academicTerm + '/' + submissionData.class + '/' + submissionData.professor + '/.json'
    
    //still working on posting the grade to the above url
  }
}
