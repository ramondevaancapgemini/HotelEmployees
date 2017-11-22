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
  pageLimit = 10;
  currentPage = 1;

  filter: string;

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

  matchesFilter(employee: Employee) {
    if (this.filter) {
      const args = this.filter.split(' ');
      for (const arg of args) {
        if (!this.matchesEmployee(arg, employee)) {
          return false;
        }
      }
    }
    return true;
  }

  matchesEmployee(searchString: string, employee: Employee) {
    return (employee.firstName.toLowerCase().indexOf(searchString.toLowerCase()) !== -1
      || employee.lastName.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  getPagination(): number[] {
    const min = Math.max(1, this.currentPage - 2);
    const max = Math.min(min + 4, this.totalPages);
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
