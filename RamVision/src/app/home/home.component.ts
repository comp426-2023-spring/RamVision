import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  majors = ['COMP', 'PHYS', 'MATH'];
  classes = ['CS101', 'EE201', 'ME301'];
  professors = ['Kris Jordan', 'Brent Munsell', 'Shashank Srivastava'];

  constructor() {
    console.log(this.majors, this.classes, this.professors);
  }
}
