import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import * as _ from 'lodash';

import { Employee } from '../model/Employee';
import { EmployeeService } from '../service/employee.service';
import { AlertService } from '../service/alert.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  original: Employee;
  model: Employee;
  loading: boolean;

  constructor(private employeeService: EmployeeService, private alertService: AlertService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.getEmployee();
  }

  onSubmit() {
    this.employeeService.updateEmployee(this.model)
      .subscribe(
      employee => {
        this.alertService.success("Changes saved");
        this.router.navigate(["/employees"]);
      },
      error => {
        this.alertService.error("Error updating the user");
      });
  }

  resetEmployee() {
    this.model = _.cloneDeep<Employee>(this.original);
  }

  private getEmployee() {
    this.loading = true;
    const id = +this.route.snapshot.paramMap.get('id');
    this.employeeService.getEmployee(+id).subscribe(
      employee => {
        this.original = employee;
        this.model = _.cloneDeep<Employee>(employee);
        this.loading = false;
      },
      error => {
        this.alertService.error("Error loading the user");
        this.loading = false;
      });
  }

  equals(): boolean {
    return _.isEqual(this.model, this.original);
  }
}
