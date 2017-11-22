import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
// import {LoggingService} from './logging.service';
import {Observable} from 'rxjs/Observable';
import {Employee} from '../model/Employee';
import {UserData} from '../model/UserData';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class EmployeeService {
  private employeesUrl = 'https://reqres.in/api/users';  // URL to web api

  constructor(private http: HttpClient,
              // private loggingService: LoggingService
  ) {
  }

  /** GET employees from the server */
  getEmployees(page: number, limit: number): Observable<UserData> {
    // return this.http.get<UserData>(this.employeesUrl + '?page=' + page + '&per_page=' + limit)
    //   .pipe(
    //     tap(employees => this.log(`fetched employees`)),
    //     catchError(this.handleError('getEmployees', [])),
    //     map(body => {
    //       const users = body['data'].map(user =>
    //         new Employee(user.id, user.first_name, user.last_name, user.avatar)
    //       );
    //
    //       return {
    //         currentPage: body['page'],
    //         totalPages: body['total_pages'],
    //         pageLimit: body['per_page'],
    //         employees: users
    //       };
    //     })
    //   );

    return this.http.get<UserData>(this.employeesUrl + '?page=' + page + '&per_page=' + limit)
      // .do(() => {
      //   this.loggingService.add(`fetched employees`);
      // })
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
      })
      .catch(error => Observable.throw(error));
  }

  // /** GET employee by id. Return `undefined` when id not found */
  // getEmployeeNo404<Data>(id: number): Observable<Employee> {
  //   const url = `${this.employeesUrl}/?id=${id}`;
  //   return this.http.get<Employee[]>(url)
  //     .pipe(
  //     map(employees => employees[0]), // returns a {0|1} element array
  //     tap(h => {
  //       const outcome = h ? `fetched` : `did not find`;
  //       this.log(`${outcome} employee id=${id}`);
  //     }),
  //     catchError(this.handleError<Employee>(`getEmployee id=${id}`))
  //     );
  // }

  /** GET employee by id. Will 404 if id not found */
  getEmployee(id: number): Observable<Employee> {
    const url = `${this.employeesUrl}/${id}`;
    return this.http.get<Employee>(url)
      .map(body => {
        const temp = body['data'];

        return new Employee(temp.id, temp.first_name, temp.last_name, temp.avatar);
      })
      // .do((employee) => {
      //   this.loggingService.add(`fetched employee id=${employee.id}`);
      // })
      .catch(error => Observable.throw(error));
  }

  // /* GET employees whose name contains search term */
  // searchEmployees(term: string): Observable<Employee[]> {
  //   if (!term.trim()) {
  //     // if not search term, return empty employee array.
  //     return of([]);
  //   }
  //   return this.http.get<Employee[]>(`api/employees/?name=${term}`).pipe(
  //     tap(_ => this.log(`found employees matching "${term}"`)),
  //     catchError(this.handleError<Employee[]>('searchEmployees', []))
  //   );
  // }

  //////// Save methods //////////

  /** POST: add a new employee to the server */
  addEmployee(employee: Employee): Observable<Employee> {
    // return this.http.post(this.employeesUrl, employee, httpOptions).pipe(
    //   tap(data => {
    //     this.log(`added employee w/ id=${data['id']}`);
    //   }),
    //   catchError(ee => {
    //     return this.handleError<Employee>('addEmployee')(ee);
    //   }),
    //   map(data => {
    //     return new Employee(data['id'], data['firstName'], data['lastName'], data['avatar']);
    //   })
    // );
    return this.http.post(this.employeesUrl, employee, httpOptions)
      .map(data => {
        return new Employee(data['id'], data['firstName'], data['lastName'], data['avatar']);
      })
      // .do((e) => {
      //   this.loggingService.add(`added employee w/ id=${e.id}`);
      // })
      .catch(error => Observable.throw(error));
  }

  /** DELETE: delete the employee from the server */
  deleteEmployee(employee: Employee | number): Observable<Object> {
    const id = typeof employee === 'number' ? employee : employee.id;
    const url = `${this.employeesUrl}/${id}`;

    // return this.http.delete(url, httpOptions).pipe(
    //   tap(_ => this.log(`deleted employee id=${id}`)),
    //   catchError(this.handleError<Employee>('deleteEmployee'))
    // );

    return this.http.delete(url, httpOptions)
      // .do(() => {
      //   this.loggingService.add(`deleted employee id=${id}`);
      // })
      .catch(error => Observable.throw(error));
  }

  /** PUT: update the employee on the server */
  updateEmployee(employee: Employee): Observable<Object> {
    // return this.http.put(`${this.employeesUrl}/${employee.id}`, employee, httpOptions).pipe(
    //   tap(_ => this.log(`updated employee id=${employee.id}`)),
    //   catchError(this.handleError<any>('updateEmployee'))
    // );

    return this.http.put(`${this.employeesUrl}/${employee.id}`, employee, httpOptions)
      // .do(() => {
      //   this.loggingService.add(`updated employee id=${employee.id}`);
      // })
      .catch(error => Observable.throw(error));
  }

  // /**
  //  * Handle Http operation that failed.
  //  * Let the app continue.
  //  * @param operation - name of the operation that failed
  //  * @param result - optional value to return as the observable result
  //  */
  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //
  //     console.error(error); // log to console instead
  //
  //     this.log(`${operation} failed: ${error.message}`);
  //
  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }
  //
  // /** Log a EmployeeService message with the MessageService */
  // private log(message: string) {
  //   this.loggingService.add('EmployeeService: ' + message);
  // }
}
