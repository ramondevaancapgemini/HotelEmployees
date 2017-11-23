import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoggingService} from './logging.service';
import {Observable} from 'rxjs/Observable';
import {Employee} from '../model/Employee';
import {UserData} from '../model/UserData';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class EmployeeService {
  private employeesUrl = 'https://reqres.in/api/users';  // URL to web api

  constructor(private http: HttpClient,
              private loggingService: LoggingService
  ) {
  }

  /** GET employees from the server */
  getEmployees(page: number, limit: number): Observable<UserData> {
    return this.http.get(this.employeesUrl + '?page=' + page + '&per_page=' + limit)
      .do(() => {
        this.loggingService.add(`fetched employees`);
      })
      .map(body => {
        const users = body['data'].map(user =>
          new Employee(user.id, user.first_name, user.last_name, user.avatar)
        );

        return {
          currentPage: body['page'],
          totalPages: body['total_pages'],
          pageLimit: body['per_page'],
          employees: users
        };
      });
  }

  /** GET employee by id. Will 404 if id not found */
  getEmployee(id: number): Observable<Employee> {
    const url = `${this.employeesUrl}/${id}`;
    return this.http.get(url)
      .map(body => {
        const temp = body['data'];

        return new Employee(temp.id, temp.first_name, temp.last_name, temp.avatar);
      })
      .do((employee) => {
        if (employee && employee.id) {
          this.loggingService.add(`fetched employee id=${employee.id}`);
        }
      });
  }

  //////// Save methods //////////

  /** POST: add a new employee to the server */
  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post(this.employeesUrl, employee, httpOptions)
      .map(data => {
        return new Employee(data['id'], data['firstName'], data['lastName'], data['avatar']);
      })
      .do((e) => {
        if (e && e.id) {
          this.loggingService.add(`added employee w/ id=${e.id}`);
        }
      });
  }

  /** DELETE: delete the employee from the server */
  deleteEmployee(employee: Employee | number): Observable<Object> {
    const id = typeof employee === 'number' ? employee : employee.id;
    const url = `${this.employeesUrl}/${id}`;

    return this.http.delete(url, httpOptions)
      .do(() => {
        this.loggingService.add(`deleted employee id=${id}`);
      });
  }

  /** PUT: update the employee on the server */
  updateEmployee(employee: Employee): Observable<Object> {
    return this.http.put(`${this.employeesUrl}/${employee.id}`, employee, httpOptions)
      .do(() => {
        if (employee && employee.id) {
          this.loggingService.add(`updated employee id=${employee.id}`);
        }
      });
  }
}
