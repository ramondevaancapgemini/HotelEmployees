import { Component, OnInit } from '@angular/core';
import {Employee} from "../Employee";

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {
  model : Employee;

  constructor() {
    this.newEmployee();
  }

  ngOnInit() {
  }

  onSubmit() {
    //TODO: Add to server
  }

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
