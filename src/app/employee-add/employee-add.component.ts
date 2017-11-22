import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {Employee} from '../model/Employee';
import {EmployeeService} from '../service/employee.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {
  model: Employee;
  adding: boolean;

  constructor(private employeeService: EmployeeService, private location: Location) {
    this.newEmployee();
    this.adding = false;
  }

  ngOnInit() {
  }

  onSubmit() {
    this.adding = true;
    this.employeeService.addEmployee(this.model)
      .subscribe(() => {
        this.adding = false;
        this.location.back();
      });
  }

  goBack(): void {
    this.location.back();
  }

  newEmployee() {
    this.model = new Employee(-1, '', '');
  }
}
