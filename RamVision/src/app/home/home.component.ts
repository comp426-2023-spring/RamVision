import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  majors = ['AERO', 'AAAD', 'AMST', 'ANTH', 'APPL', 'ARAB', 'ARCH', 'ARMY', 'ARTH', 'ASIA', 'ASTR', 'BIOC', 'BCB', 'BBSP', 'BIOL', 'BMME', 'BIOS', 'BCS', 'BUSI', 'CHIP', 'CATA', 'CBIO', 'CBPH', 'CBMC', 'CHEM', 'CHER', 'CHWA', 'CHIN', 'PLAN', 'CLAR', 'CLAS', 'CLSC', 'CRMH', 'COMM', 'CMPL', 'COMP', 'EURO', 'CZCH', 'DENG', 'DHYG', 'DHED', 'DRAM', 'DTCH', 'ECON', 'EDUC', 'ENDO', 'ENGL', 'ENEC', 'ENVR', 'EPID', 'EXSS', 'EDMX', 'SPCL', 'DPET', 'FOLK', 'FREN', 'GNET', 'GEOG', 'GEOL', 'GERM', 'GSLL', 'GLBL', 'GOVT', 'GRAD', 'GREK', 'HBEH', 'HPM', 'HEBR', 'HNUR', 'HIST', 'HUNG', 'INLS', 'IDST', 'ITAL', 'JAPN', 'JWST', 'SWAH', 'KOR', 'LTAM', 'LATN', 'LFIT', 'LGLA', 'LING', 'MACD', 'MNGT', 'MASC', 'MTSC', 'MHCH', 'MATH', 'MEJO', 'MCRO', 'MUSC', 'NAVS', 'NBIO', 'NSCI', 'NURS', 'NUTR', 'OCSC', 'OCCT', 'OPER', 'ORPA', 'ORAD', 'ORTH', 'PATH', 'PWAD', 'PEDO', 'PERI', 'PRSN', 'PHRS', 'DPMP', 'PHCO', 'NON-DEPARTMENTAL', 'PHCY', 'DPOP', 'DPPE', 'PHIL', 'PHYA', 'PHYS', 'PHYI', 'PLSH', 'POLI', 'PORT', 'PACE', 'PROS', 'PSYC', 'PUBA', 'PUBH', 'PLCY', 'RADI', 'RECR', 'RELI', 'ROML', 'RUSS', 'SPHG', 'SLAV', 'SOWO', 'SOCI', 'SPAN', 'SPHS', 'STOR', 'ARTS', 'TOXC', 'TURK', 'UKRN', 'URES', 'VIET', 'WOLO', 'WGST', 'YORU', 'MAYA'];
  semesters = ['Fall', 'Spring'];
  years = [2023, 2022, 2021, 2020, 2019, 2018]
  // Classes should be dynamically rendered based on major & term selection...
  classes: string[] = [];
  // Professors should be dynamically rendered based on major & term & class...
  professors: string[] = [];

  searchForm = new FormGroup({
    // major and term need default values to intially populate the query and fill class
    // and professor. when they are changed the search bar will reload
    major: new FormControl('AERO', Validators.required),
    semester: new FormControl('Fall', Validators.required),
    year: new FormControl(2023, Validators.required),
    class: new FormControl('CLASS', Validators.required),
    professor: new FormControl('PROFESSOR', Validators.required)
  });

  constructor(private router: Router, private http: HttpClient) { 
  }

  ngOnInit(): void {
    const majorControl = this.searchForm.get('major')!;
    const semesterControl = this.searchForm.get('semester')!;
    const yearControl = this.searchForm.get('year')!;
    const classControl = this.searchForm.get('class')!;
    const professorControl = this.searchForm.get('professor')!;

    // populate the classes with the intial values
    this.getClasses();

    // Subscribe to changes in the major form control to see the value as it changes in the form
    // Use this to take the value and build a query to ping database and fill out professor and class based on this...

    // If the major is changed then update the values for class
    majorControl.valueChanges.subscribe(() => this.getClasses());
    // If term changes then reset classes
    semesterControl.valueChanges.subscribe(() => this.getClasses());
    // If year changes
    yearControl.valueChanges.subscribe(() => this.getClasses());

    // if anything changes, reset professor
    majorControl.valueChanges.subscribe(() => this.getProfessors());
    semesterControl.valueChanges.subscribe(() => this.getProfessors());
    yearControl.valueChanges.subscribe(() => this.getProfessors());
    classControl.valueChanges.subscribe(() => this.getProfessors());
  }

  onSubmit() {
    if (this.searchForm.valid) {
      const major = this.searchForm.get('major')!.value;
      const semester = this.searchForm.get('semester')!.value;
      const year = this.searchForm.get('year')!.value;
      const selectedClass = this.searchForm.get('class')!.value;
      const professor = this.searchForm.get('professor')!.value;


      // Building the URL from the JSON
      const url = `https://ramvision-ecaa0-default-rtdb.firebaseio.com/${year}/${semester}/${major}/${selectedClass}/${professor}.json`;
      
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

        console.log(grades)
        // Should take in the grades and render a graph
        this.renderStats();
    });
  }
}

  getClasses(){
    // Takes a major value and term and constructs appropriate url for get request
    // Empty the classes we have loaded for now
    this.classes = []
    const url =  `https://ramvision-ecaa0-default-rtdb.firebaseio.com/${this.searchForm.get('year')!.value}/${this.searchForm.get('semester')!.value}/${this.searchForm.get('major')!.value}/.json`
    console.log(url)
    this.http.get<any>(url).subscribe((data: { [key: string]: string }) => {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const class_i = key;
          // Add the class value to the class array
          this.classes.push(class_i);
        }
      }
  });
}

  getProfessors(){
    // Takes a major value and term and constructs appropriate url for get request
    // Empty loaded professors
    this.professors = []
    const url =  `https://ramvision-ecaa0-default-rtdb.firebaseio.com/${this.searchForm.get('year')!.value}/${this.searchForm.get('semester')!.value}/${this.searchForm.get('major')!.value}/${this.searchForm.get('class')!.value}/.json`
    console.log(url)
    this.http.get<any>(url).subscribe((data: { [key: string]: string }) => {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const professor = key;
          // Add the professor value to the professor array
          this.professors.push(professor);
        }
      }
    });
  }


  renderStats(){
    // Add in functionality to render graph and stats based on OnSubmit() query
  }

}
