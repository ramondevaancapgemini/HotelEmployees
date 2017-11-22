import { Component, OnInit} from '@angular/core';
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
  loading: boolean;

  constructor(private employeeService: EmployeeService,
              private alertService: AlertService,
              private route: ActivatedRoute) {
    this.loading = false;
  }

  ngOnInit() {
    this.getEmployee();
  }

  private getEmployee() {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');
    this.employeeService.getEmployee(+id).subscribe(
      employee => {
        this.model = employee;
        this.loading = false;
      },
      ignored => {
        this.alertService.error('Error loading employee');
        this.loading = false;
      });
  }
}
