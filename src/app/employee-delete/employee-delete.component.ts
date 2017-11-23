import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Employee } from '../model/Employee';
import { EmployeeService } from '../service/employee.service';
import { AlertService } from '../service/alert.service';

@Component({
  selector: 'app-employee-delete',
  templateUrl: './employee-delete.component.html',
  styleUrls: ['./employee-delete.component.css']
})
export class EmployeeDeleteComponent implements OnInit {
  model: Employee;
  deleting: boolean;
  loading: boolean;

  constructor(private employeeService: EmployeeService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router) {
    this.deleting = false;
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

  doDelete(): void {
    this.deleting = true;
    this.employeeService.deleteEmployee(this.model)
      .subscribe(
      employee => {
        this.alertService.success('Successfully deleted ' + this.model.firstName + ' ' + this.model.lastName);
        this.router.navigate(['/employees']);
        this.deleting = false;
      },
      ignored => {
        this.alertService.error('Error deleting employee');
        this.deleting = false;
      });
  }
}
