import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Employee } from '../model/Employee';
import { EmployeeService } from '../service/employee.service';
import { AlertService } from '../service/alert.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  model: Employee;

  constructor(private employeeService: EmployeeService, private alertService: AlertService, private route: ActivatedRoute) {
    // this.model = new Employee(-1, '', '');
  }

  ngOnInit() {
    this.getEmployee();
  }

  private getEmployee() {
    const id = this.route.snapshot.paramMap.get('id');
    this.employeeService.getEmployee(+id).subscribe(
      employee => {
        this.model = employee;
      },
      error => {
        this.alertService.error("Couldn't load this user");
      });
  }
}
