import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-submissionform',
  templateUrl: './submissionform.component.html',
  styleUrls: ['./submissionform.component.css']
})
export class SubmissionFormComponent {
  majors =  ['AERO', 'AAAD', 'AMST', 'ANTH', 'APPL', 'ARAB', 'ARCH', 'ARMY', 'ARTH', 'ASIA', 'ASTR', 'BIOC', 'BCB', 'BBSP', 'BIOL', 'BMME', 'BIOS', 'BCS', 'BUSI', 'CHIP', 'CATA', 'CBIO', 'CBPH', 'CBMC', 'CHEM', 'CHER', 'CHWA', 'CHIN', 'PLAN', 'CLAR', 'CLAS', 'CLSC', 'CRMH', 'COMM', 'CMPL', 'COMP', 'EURO', 'CZCH', 'DENG', 'DHYG', 'DHED', 'DRAM', 'DTCH', 'ECON', 'EDUC', 'ENDO', 'ENGL', 'ENEC', 'ENVR', 'EPID', 'EXSS', 'EDMX', 'SPCL', 'DPET', 'FOLK', 'FREN', 'GNET', 'GEOG', 'GEOL', 'GERM', 'GSLL', 'GLBL', 'GOVT', 'GRAD', 'GREK', 'HBEH', 'HPM', 'HEBR', 'HNUR', 'HIST', 'HUNG', 'INLS', 'IDST', 'ITAL', 'JAPN', 'JWST', 'SWAH', 'KOR', 'LTAM', 'LATN', 'LFIT', 'LGLA', 'LING', 'MACD', 'MNGT', 'MASC', 'MTSC', 'MHCH', 'MATH', 'MEJO', 'MCRO', 'MUSC', 'NAVS', 'NBIO', 'NSCI', 'NURS', 'NUTR', 'OCSC', 'OCCT', 'OPER', 'ORPA', 'ORAD', 'ORTH', 'PATH', 'PWAD', 'PEDO', 'PERI', 'PRSN', 'PHRS', 'DPMP', 'PHCO', 'NON-DEPARTMENTAL', 'PHCY', 'DPOP', 'DPPE', 'PHIL', 'PHYA', 'PHYS', 'PHYI', 'PLSH', 'POLI', 'PORT', 'PACE', 'PROS', 'PSYC', 'PUBA', 'PUBH', 'PLCY', 'RADI', 'RECR', 'RELI', 'ROML', 'RUSS', 'SPHG', 'SLAV', 'SOWO', 'SOCI', 'SPAN', 'SPHS', 'STOR', 'ARTS', 'TOXC', 'TURK', 'UKRN', 'URES', 'VIET', 'WOLO', 'WGST', 'YORU', 'MAYA'];
  years = [2023, 2022, 2021, 2020, 2019, 2018]; // add years as needed
  formData = {
    major: '',
    class: null,
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
    // Removed class, academic term, and other info to reduce redundancy in database
    // only the grade is stored under the folder of the corresponding class information
    const submissionData = {
      // year: this.formData.year,
      // academicTerm: this.formData.academicTerm,
      // major: this.formData.major,
      // class: this.formData.class,
      // professor: this.formData.professor,
      gradeReceived: this.formData.gradeReceived
    };
    
    // For testing
    console.log(submissionData);
    
    // Building the URL from the JSON
    const url = `https://ramvision-ecaa0-default-rtdb.firebaseio.com/${this.formData.year}/${this.formData.academicTerm}/${this.formData.major}/${this.formData.class}/${this.formData.professor}.json`;
    
    // Start with an empty list of grades
    let gradeList = [80,85]
    // console.log(this.http.get(url))
    // // Update the grades with whatever is in the database
    // gradeList.push(this.http.get(url))
    // console.log("GRADES ARE" + gradeList)
    // // Then add in the grade that was just submitted
    // gradeList.push(this.formData.gradeReceived)
    // console.log("GRADES ARE" + gradeList)
    console.log(this.http.get(url))
    // Make PUT call
    return this.http.put(url, gradeList);
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
