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
    
    // Do something with the submission data, like send it to a server or save it in local storage
    console.log(submissionData);
  }
}
