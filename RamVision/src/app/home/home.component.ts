import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  majors = ['AERO', 'AAAD', 'AMST', 'ANTH', 'APPL', 'ARAB', 'ARCH', 'ARMY', 'ARTH', 'ASIA', 'ASTR', 'BIOC', 'BCB', 'BBSP', 'BIOL', 'BMME', 'BIOS', 'BCS', 'BUSI', 'CHIP', 'CATA', 'CBIO', 'CBPH', 'CBMC', 'CHEM', 'CHER', 'CHWA', 'CHIN', 'PLAN', 'CLAR', 'CLAS', 'CLSC', 'CRMH', 'COMM', 'CMPL', 'COMP', 'EURO', 'CZCH', 'DENG', 'DHYG', 'DHED', 'DRAM', 'DTCH', 'ECON', 'EDUC', 'ENDO', 'ENGL', 'ENEC', 'ENVR', 'EPID', 'EXSS', 'EDMX', 'SPCL', 'DPET', 'FOLK', 'FREN', 'GNET', 'GEOG', 'GEOL', 'GERM', 'GSLL', 'GLBL', 'GOVT', 'GRAD', 'GREK', 'HBEH', 'HPM', 'HEBR', 'HNUR', 'HIST', 'HUNG', 'INLS', 'IDST', 'ITAL', 'JAPN', 'JWST', 'SWAH', 'KOR', 'LTAM', 'LATN', 'LFIT', 'LGLA', 'LING', 'MACD', 'MNGT', 'MASC', 'MTSC', 'MHCH', 'MATH', 'MEJO', 'MCRO', 'MUSC', 'NAVS', 'NBIO', 'NSCI', 'NURS', 'NUTR', 'OCSC', 'OCCT', 'OPER', 'ORPA', 'ORAD', 'ORTH', 'PATH', 'PWAD', 'PEDO', 'PERI', 'PRSN', 'PHRS', 'DPMP', 'PHCO', 'NON-DEPARTMENTAL', 'PHCY', 'DPOP', 'DPPE', 'PHIL', 'PHYA', 'PHYS', 'PHYI', 'PLSH', 'POLI', 'PORT', 'PACE', 'PROS', 'PSYC', 'PUBA', 'PUBH', 'PLCY', 'RADI', 'RECR', 'RELI', 'ROML', 'RUSS', 'SPHG', 'SLAV', 'SOWO', 'SOCI', 'SPAN', 'SPHS', 'STOR', 'ARTS', 'TOXC', 'TURK', 'UKRN', 'URES', 'VIET', 'WOLO', 'WGST', 'YORU', 'MAYA'];
  classes = ['CS101', 'EE201', 'ME301'];
  professors = ['Kris Jordan', 'Brent Munsell', 'Shashank Srivastava'];
  terms = ['Fall 2021', 'Spring 2023']

  constructor(private router: Router) {}

  // Testing Purposes
  //   console.log("works");
  // }

}
