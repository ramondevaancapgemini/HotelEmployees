import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Employee } from '../model/Employee';
import { EmployeeService } from '../service/employee.service';
import { AlertService } from '../service/alert.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {
  model: Employee;
  adding: boolean;

  constructor(
    private employeeService: EmployeeService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.newEmployee();
    this.adding = false;
  }

  ngOnInit() {
  }

  onSubmit() {
    this.adding = true;
    this.employeeService.addEmployee(this.model)
      .subscribe(
      ignored => {
        this.alertService.success('Added employee');
        this.router.navigate(['/employees']);
        this.adding = false;
      },
      ignored => {
        this.alertService.error('Error adding employee');
        this.adding = false;
      });
  }

  newEmployee() {
    this.model = new Employee(-1, '', '');
  }
}
