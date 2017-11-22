import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/Employee';
import { EmployeeService } from '../service/employee.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-employee-index',
  templateUrl: './employee-index.component.html',
  styleUrls: ['./employee-index.component.css']
})
export class EmployeeIndexComponent implements OnInit {

  employees: Employee[];

  constructor(private employeeService: EmployeeService) { }

  totalPages: number;
  pageLimit: number = 10;
  currentPage: number = 1;

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees(page: number = this.currentPage, limit: number = this.pageLimit): void {
    this.employees = undefined;
    this.employeeService.getEmployees(page, limit)
      .subscribe(userData => {
        this.employees = userData.employees;
        this.totalPages = userData.totalPages;
        this.pageLimit = userData.pageLimit;
        this.currentPage = Math.max(Math.min(userData.totalPages, userData.currentPage), 1);
      });
  }

  getPagination(): number[] {
    let min = Math.max(1, this.currentPage - 2);
    let max = Math.min(min + 4, this.totalPages);
    return _.range(min, max + 1);
  }

  loadPage(page: number) {
    page = Math.max(Math.min(this.totalPages, page), 1);
    this.getEmployees(page);
  }

  loadAmount(amount: number) {
    this.getEmployees(1, amount);
  }

}
