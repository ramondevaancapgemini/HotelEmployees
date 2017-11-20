import { Component, OnInit } from '@angular/core';
import { Employee } from '../Employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-index',
  templateUrl: './employee-index.component.html',
  styleUrls: ['./employee-index.component.css']
})
export class EmployeeIndexComponent implements OnInit {

  employees: Employee[];
  
   constructor(private employeeService: EmployeeService) { }
  
   ngOnInit() {
     this.getEmployees();
   }
  
   getEmployees(): void {
     this.employeeService.getEmployees()
     .subscribe(employees => this.employees = employees);
   }
  
  //  add(name: string): void {
  //    name = name.trim();
  //    if (!name) { return; }
  //    this.employeeService.addEmployee({ givenName } as Employee)
  //      .subscribe(hero => {
  //        this.heroes.push(hero);
  //      });
  //  }
  
   delete(employee: Employee): void {
     this.employees = this.employees.filter(h => h !== employee);
     this.employeeService.deleteEmployee(employee).subscribe();
   }

}
