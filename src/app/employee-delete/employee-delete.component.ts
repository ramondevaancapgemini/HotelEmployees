import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {Employee} from '../model/Employee';
import {EmployeeService} from '../service/employee.service';

@Component({
  selector: 'app-employee-delete',
  templateUrl: './employee-delete.component.html',
  styleUrls: ['./employee-delete.component.css']
})
export class EmployeeDeleteComponent implements OnInit {
  model: Employee;
  deleting: boolean;

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute, private location: Location) {
    this.deleting = false;
  }

  ngOnInit() {
    this.getEmployee();
  }

  private getEmployee() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.employeeService.getEmployee(+id).subscribe(employee => {
      this.model = employee;
    });
  }

  delete(): void {
    this.deleting = true;
    this.employeeService.deleteEmployee(this.model)
      .subscribe(() => {
        this.deleting = false;
        this.location.back();
      });
  }

  goBack(): void {
    this.location.back();
  }
}
