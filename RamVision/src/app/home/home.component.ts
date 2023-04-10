import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  majors = ['AERO', 'AAAD', 'AMST', 'ANTH', 'APPL', 'ARAB', 'ARCH', 'ARMY', 'ARTH', 'ASIA', 'ASTR', 'BIOC', 'BCB', 'BBSP', 'BIOL', 'BMME', 'BIOS', 'BCS', 'BUSI', 'CHIP', 'CATA', 'CBIO', 'CBPH', 'CBMC', 'CHEM', 'CHER', 'CHWA', 'CHIN', 'PLAN', 'CLAR', 'CLAS', 'CLSC', 'CRMH', 'COMM', 'CMPL', 'COMP', 'EURO', 'CZCH', 'DENG', 'DHYG', 'DHED', 'DRAM', 'DTCH', 'ECON', 'EDUC', 'ENDO', 'ENGL', 'ENEC', 'ENVR', 'EPID', 'EXSS', 'EDMX', 'SPCL', 'DPET', 'FOLK', 'FREN', 'GNET', 'GEOG', 'GEOL', 'GERM', 'GSLL', 'GLBL', 'GOVT', 'GRAD', 'GREK', 'HBEH', 'HPM', 'HEBR', 'HNUR', 'HIST', 'HUNG', 'INLS', 'IDST', 'ITAL', 'JAPN', 'JWST', 'SWAH', 'KOR', 'LTAM', 'LATN', 'LFIT', 'LGLA', 'LING', 'MACD', 'MNGT', 'MASC', 'MTSC', 'MHCH', 'MATH', 'MEJO', 'MCRO', 'MUSC', 'NAVS', 'NBIO', 'NSCI', 'NURS', 'NUTR', 'OCSC', 'OCCT', 'OPER', 'ORPA', 'ORAD', 'ORTH', 'PATH', 'PWAD', 'PEDO', 'PERI', 'PRSN', 'PHRS', 'DPMP', 'PHCO', 'NON-DEPARTMENTAL', 'PHCY', 'DPOP', 'DPPE', 'PHIL', 'PHYA', 'PHYS', 'PHYI', 'PLSH', 'POLI', 'PORT', 'PACE', 'PROS', 'PSYC', 'PUBA', 'PUBH', 'PLCY', 'RADI', 'RECR', 'RELI', 'ROML', 'RUSS', 'SPHG', 'SLAV', 'SOWO', 'SOCI', 'SPAN', 'SPHS', 'STOR', 'ARTS', 'TOXC', 'TURK', 'UKRN', 'URES', 'VIET', 'WOLO', 'WGST', 'YORU', 'MAYA'];
  terms = ['Fall 2021', 'Spring 2023'];
  // Classes should be dynamically rendered based on major & term selection...
  classes = ['CS101', 'EE201', 'ME301'];
  // Professors should be dynamically rendered based on major & term & class...
  professors = ['Kris Jordan', 'Brent Munsell', 'Shashank Srivastava'];

  searchForm = new FormGroup({
    major: new FormControl('MAJOR', Validators.required),
    term: new FormControl('TERM', Validators.required),
    class: new FormControl('CLASS', Validators.required),
    professor: new FormControl('PROFESSOR', Validators.required)
  });

  constructor(private router: Router) { }

  ngOnInit(): void {
    const majorControl = this.searchForm.get('major')!;
    const termControl = this.searchForm.get('term')!;
    const classControl = this.searchForm.get('class')!;
    const professorControl = this.searchForm.get('professor')!;

    
    // Subscribe to changes in the major form control to see the value as it changes in the form
    // Use this to take the value and build a query to ping database and fill out professor and class based on this...
    this.searchForm.get('major')!.valueChanges.subscribe(value => {
      // Log the value to the console
      console.log(value);
    });

    // If the major is changed then reset the values for class and professor
    majorControl.valueChanges.subscribe(() => {
      classControl.setValue(null);
      professorControl.setValue(null);
    });

    // If term changes then reset class and professor too
    termControl.valueChanges.subscribe(() => {
      classControl.setValue(null);
      professorControl.setValue(null);
    });

    // If the class changes, reset professor
    classControl.valueChanges.subscribe(() => {
      professorControl.setValue(null);
    });
  }

  onSubmit() {
    if (this.searchForm.valid) {
      const major = this.searchForm.get('major')!.value;
      const term = this.searchForm.get('term')!.value;
      const selectedClass = this.searchForm.get('class')!.value;
      const professor = this.searchForm.get('professor')!.value;
    }
  }
}
