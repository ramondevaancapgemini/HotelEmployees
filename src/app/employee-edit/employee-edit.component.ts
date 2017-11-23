import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  updating: boolean;

  constructor(private employeeService: EmployeeService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit() {
    this.getEmployee();
  }

  onSubmit() {
    this.updating = true;
    this.employeeService.updateEmployee(this.model)
      .subscribe(
      ignored => {
        this.alertService.success('Successfully saved changes for ' + this.model.firstName + ' ' + this.model.lastName);
        this.router.navigate(['/employees']);
        this.updating = false;
      },
      ignored => {
        this.alertService.error('Error updating employee');
        this.updating = false;
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
      ignored => {
        this.alertService.error('Error loading employee');
        this.loading = false;
      });
  }

  equals(): boolean {
    return _.isEqual(this.model, this.original);
  }
}
