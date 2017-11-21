import { Component, OnInit } from '@angular/core';
import {Employee} from "../Employee";

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {
  model : Employee;

  submitted = false;

  constructor() {
    this.newEmployee();
  }

  ngOnInit() {
  }

  onSubmit() { this.submitted = true; }

  newEmployee() {
    this.model = new Employee(-1, '', '');
  }

  // add(name: string): void {
  //   name = name.trim();
  //   if (!name) { return; }
  //   this.heroService.addHero({ name } as Hero)
  //     .subscribe(hero => {
  //       this.heroes.push(hero);
  //     });
  // }
}
