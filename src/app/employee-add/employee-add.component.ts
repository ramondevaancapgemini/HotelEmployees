import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Employee } from '../model/Employee';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {
  model : Employee;

  constructor(private employeeService: EmployeeService, private location: Location) {
    this.newEmployee();
  }

  ngOnInit() {
  }

  onSubmit() {
    this.employeeService.addEmployee(this.model)
      .subscribe(() => this.location.back());
  }

  goBack(): void {
    this.location.back();
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
