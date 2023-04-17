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
  terms = ['Fall 2021', 'Spring 2023'];
  // Classes should be dynamically rendered based on major & term selection...
  classes = ['CS101', 'EE201', 'ME301'];
  // Professors should be dynamically rendered based on major & term & class...
  professors = ['Kris Jordan', 'Brent Munsell', 'Shashank Srivastava'];

  searchForm = new FormGroup({
    // major and term need default values to intially populate the query and fill class
    // and professor. when they are changed the search bar will reload
    major: new FormControl('AERO', Validators.required),
    term: new FormControl('Fall 2021', Validators.required),
    class: new FormControl('CLASS', Validators.required),
    professor: new FormControl('PROFESSOR', Validators.required)
  });

  constructor(private router: Router, private http: HttpClient) { 
  }

  ngOnInit(): void {
    const majorControl = this.searchForm.get('major')!;
    const termControl = this.searchForm.get('term')!;
    const classControl = this.searchForm.get('class')!;
    const professorControl = this.searchForm.get('professor')!;

    // populate the classes with the intial values
    this.getClasses(this.searchForm.get('major')!.value, this.searchForm.get('term')!.value)

    // Subscribe to changes in the major form control to see the value as it changes in the form
    // Use this to take the value and build a query to ping database and fill out professor and class based on this...

    // If the major is changed then update the values for class
    majorControl.valueChanges.subscribe(value => {
      this.getClasses(value, this.searchForm.get('term'));
    });

    // If term changes then reset classes
    termControl.valueChanges.subscribe(value => {
      this.getClasses(this.searchForm.get('major'), value);
    });

    // If the class changes, reset professor
    classControl.valueChanges.subscribe(value => {
      this.getProfessors(this.searchForm.get('major'), this.searchForm.get('term'), value);
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

  getClasses(major: string | AbstractControl<string | null, string | null> | null, term: string | AbstractControl<string | null, string | null> | null){
    // use major (value) & term
    var semester = ''
    var year = ''
    if (typeof term === 'string') {
        semester = term.split(' ', 2)[0]
	year = term.split(' ', 2)[1]
    }
    console.log(semester)
    console.log(year)
    // TODO: make a GET request to query database and populate the dropdowns with the correct classes
    // for a given major, and term
    const url = `https://ramvision-ecaa0-default-rtdb.firebaseio.com/`
    //NOTE: Getting a CORS error here trying to make the request to the database, will fix
    var temp = this.http.get(url).subscribe(
	    res => {
		    console.log(res)
	    }, 
	    err => {
		    console.log(err)
	    } )
    console.log(temp)
  }

  getProfessors(major: string | AbstractControl<string | null, string | null> | null, term: string | AbstractControl<string | null, string | null> | null, course: string | null | undefined){
    // use major & term (value)
    // console.log(major)
    // console.log(term)
    // console.log(course)
    // TODO: make a GET request to query database and populate the dropdowns with the correct professors
    // for a given major, term, and class
    const url = `https://ramvision-ecaa0-default-rtdb.firebaseio.com/`

  }

}
