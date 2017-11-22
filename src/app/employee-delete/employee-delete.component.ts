import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Employee } from '../model/Employee';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-employee-delete',
  templateUrl: './employee-delete.component.html',
  styleUrls: ['./employee-delete.component.css']
})
export class EmployeeDeleteComponent implements OnInit {
  model : Employee;

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute, private location: Location) {
    // this.model = new Employee(-1, '', '');
  }

  ngOnInit() {
    this.getEmployee();
  }

  private getEmployee() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.employeeService.getEmployee(+id).subscribe(employee => {
      // this.model = employee;
    });
  }

  delete() : void {
    this.employeeService.deleteEmployee(this.model)
      .subscribe(() => this.location.back());
  }

  goBack(): void {
    this.location.back();
  }
}
