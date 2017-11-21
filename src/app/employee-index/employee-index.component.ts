import { Component, OnInit } from '@angular/core';
import { Employee } from '../Employee';
import { EmployeeService } from '../employee.service';
import * as _ from 'lodash';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-employee-index',
  templateUrl: './employee-index.component.html',
  styleUrls: ['./employee-index.component.css']
})
export class EmployeeIndexComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  employees: Employee[];
  dtTrigger: Subject<Employee> = new Subject();

  constructor(private employeeService: EmployeeService) { }

  currentPage: number;
  totalPages: number;

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees(page: number = 0): void {
    this.employeeService.getEmployees(page)
      .subscribe(userData => {
        this.employees = userData.employees;
        this.currentPage = userData.currentPage;
        this.totalPages = userData.totalPages;
        this.dtTrigger.next();
      });
  }

  getPagination(): number[] {
    let min = Math.max(1, this.currentPage - 2);
    let max = Math.min(min + 4, this.totalPages);
    return _.range(min, max + 1);
  }

  loadPage(page: number) {
    this.getEmployees(page);
  }

  //  add(name: string): void {
  //    name = name.trim();
  //    if (!name) { return; }
  //    this.employeeService.addEmployee({ givenName } as Employee)
  //      .subscribe(hero => {
  //        this.heroes.push(hero);
  //      });
  //  }

  // delete(employee: Employee): void {
  //   this.employees = this.employees.filter(h => h !== employee);
  //   this.employeeService.deleteEmployee(employee).subscribe();
  // }

}
