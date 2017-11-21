import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as _ from 'lodash';

import { Employee } from '../Employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  original : Employee;
  model : Employee;

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute, private location: Location) {
    this.model = new Employee(-1, '', '');
  }

  ngOnInit() {
    this.getEmployee();
  }

  onSubmit() {
    this.employeeService.updateEmployee(this.model)
      .subscribe(() => this.location.back());
  }

  resetEmployee() {
    this.model = _.cloneDeep<Employee>(this.original);
  }

  private getEmployee() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.employeeService.getEmployee(+id).subscribe(employee => {
      this.original = employee;
      this.model = _.cloneDeep<Employee>(employee);
    });
  }

  goBack(): void {
    this.location.back();
  }

  equals(): boolean {
    return _.isEqual(this.model, this.original);
    // return Employee.equals(this.model, this.original);
  }
}
