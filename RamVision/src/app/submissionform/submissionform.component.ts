import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs'

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
    gradeReceived: 0
  };

  // Http client for sending requests etc.
  constructor(private http: HttpClient) {}

  // SubmitForm updates database
  submitForm() {
    // Create a JSON object from the form data
    const submissionData = {
      gradeReceived: this.formData.gradeReceived
    };
    
    // Building the URL from the JSON
    const url = `https://ramvision-ecaa0-default-rtdb.firebaseio.com/${this.formData.year}/${this.formData.academicTerm}/${this.formData.major}/${this.formData.class}/${this.formData.professor}.json`;
    
    // Create an empty list to store the grades
    const grades: number[] = [];

    // Get the grades that are currently there for a professor
    this.http.get<any>(url).subscribe((data: { [key: number]: number }) => {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const grade = data[key];
          // Add the grade value to the grades array
          grades.push(grade);
        }
      }

      console.log("current grades are " + grades);
      // Add the new grade into the existing array that we just collected above
      grades.push(submissionData['gradeReceived']);
      console.log("updated grades are " + grades);

      // Put the new grades into the database
      this.http.put(url, grades).subscribe(response => {
        console.log("Successfully updated grades in database");
      }, error => {
        console.log("Error updating grades in database: " + error.message);
      });
    });
  }
  
}
