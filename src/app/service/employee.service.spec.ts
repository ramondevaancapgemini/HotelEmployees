import {TestBed, inject} from '@angular/core/testing';

import {EmployeeService} from './employee.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {LoggingService} from './logging.service';
import {AlertService} from './alert.service';
import {ErrorService} from './error.service';
import {ErrorHandler} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {Employee} from '../model/Employee';
import * as _ from 'lodash';

describe('EmployeeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      declarations: [],
      providers: [
        {provide: ErrorHandler, useClass: ErrorService},
        AlertService,
        EmployeeService,
        LoggingService,
      ]
    });
  });

  it('should be created', inject([EmployeeService], (service: EmployeeService) => {
    expect(service).toBeTruthy();
  }));

  describe('GetEmployees', () => {
    it('should run without errors', inject([HttpClient, LoggingService],
      (httpClient: HttpClient, loggingService: LoggingService) => {
      spyOn(httpClient, 'get').and.returnValue(Observable.of());

      const service: EmployeeService = new EmployeeService(httpClient, loggingService);

      expect(service.getEmployees(0, 5)).toBeTruthy();
    }));

    it('should perform a get request', inject([HttpClient, LoggingService],
      (httpClient: HttpClient, loggingService: LoggingService) => {
      const spy = spyOn(httpClient, 'get').and.returnValue(Observable.of());

      const service: EmployeeService = new EmployeeService(httpClient, loggingService);
      service.getEmployees(0, 5);

      expect(spy).toHaveBeenCalled();
    }));

    it('should return a single employee', inject([HttpClient, LoggingService],
      (httpClient: HttpClient, loggingService: LoggingService) => {
      const employee: Employee = new Employee(0, 'Testy', 'McTest');
      const userData = {
        currentPage: 0,
        pageLimit: 3,
        totalPages: 3,
        data: [{
          id: employee.id,
          first_name: employee.firstName,
          last_name: employee.lastName,
          avatar: employee.avatar
        }]
      };

      spyOn(httpClient, 'get').and.returnValue(Observable.of(userData));
      const service: EmployeeService = new EmployeeService(httpClient, loggingService);

      let num = 0;
      service.getEmployees(0, 5)
        .subscribe((u) => {
          num = u.employees.length;
        });

      expect(num).toEqual(1);
    }));

  });

  describe('GetEmployee', () => {
    it('should run without errors', inject([HttpClient, LoggingService],
      (httpClient: HttpClient, loggingService: LoggingService) => {
      spyOn(httpClient, 'get').and.returnValue(Observable.of());

      const service: EmployeeService = new EmployeeService(httpClient, loggingService);

      expect(service.getEmployee(0)).toBeTruthy();
    }));

    it('should return single employee', inject([HttpClient, LoggingService],
      (httpClient: HttpClient, loggingService: LoggingService) => {
      const employee: Employee = new Employee(0, 'Testy', 'McTest');
      const data = {
        data: {
          id: employee.id,
          first_name: employee.firstName,
          last_name: employee.lastName,
          avatar: employee.avatar
        }
      };

      spyOn(httpClient, 'get').and.returnValue(Observable.of(data));

      const service: EmployeeService = new EmployeeService(httpClient, loggingService);

      let ret: Employee;

      service.getEmployee(0).subscribe((e) => {
        ret = e;
      });

      if (!ret) {
        expect(false).toBeTruthy();
      } else {
        expect(_.isEqual(ret, employee)).toBeTruthy();
      }
    }));

    it('should error on non-existent employees', inject([HttpClient, LoggingService],
      (httpClient: HttpClient, loggingService: LoggingService) => {
      spyOn(httpClient, 'get').and.returnValue(Observable.throw('Employee not found'));
      const service: EmployeeService = new EmployeeService(httpClient, loggingService);

      let error = false;

      service.getEmployee(-1)
        .subscribe(() => {
        }, (ignored) => {
          error = true;
        });

      expect(error).toBeTruthy();
    }));
  });

  describe('addEmployee', () => {
    it('should run without errors', inject([HttpClient, LoggingService],
      (httpClient: HttpClient, loggingService: LoggingService) => {
      const employee: Employee = new Employee(0, 'Testy', 'McTest');
      spyOn(httpClient, 'post').and.returnValue(Observable.of());

      const service: EmployeeService = new EmployeeService(httpClient, loggingService);

      expect(service.addEmployee(employee)).toBeTruthy();
    }));

    it('should return input employee', inject([HttpClient, LoggingService],
      (httpClient: HttpClient, loggingService: LoggingService) => {
      const employee: Employee = new Employee(1, 'Testy', 'McTest');
      spyOn(httpClient, 'post').and.returnValue(Observable.of(employee));

      const service: EmployeeService = new EmployeeService(httpClient, loggingService);

      let ret: Employee;

      service.addEmployee(employee).subscribe((e) => {
        ret = e;
      });

      if (!ret) {
        expect(false).toBeTruthy();
      } else {
        expect(_.isEqual(ret, employee)).toBeTruthy();
      }
    }));

    it('should return error when add failed', inject([HttpClient, LoggingService],
      (httpClient: HttpClient, loggingService: LoggingService) => {
      const employee: Employee = new Employee(1, 'Testy', 'McTest');
      spyOn(httpClient, 'post').and.returnValue(Observable.throw('Could not add employee'));

      const service: EmployeeService = new EmployeeService(httpClient, loggingService);

      let success = true;

      service.addEmployee(employee).subscribe((ignored) => {
        // success = true;
      }, () => {
        success = false;
      });

      expect(success).toBeFalsy();
    }));
  });

  describe('deleteEmployee', () => {
    it('should run without errors', inject([HttpClient, LoggingService],
      (httpClient: HttpClient, loggingService: LoggingService) => {
      spyOn(httpClient, 'delete').and.returnValue(Observable.of());

      const service: EmployeeService = new EmployeeService(httpClient, loggingService);

      expect(service.deleteEmployee(0)).toBeTruthy();
    }));

    it('should return error when delete failed', inject([HttpClient, LoggingService],
      (httpClient: HttpClient, loggingService: LoggingService) => {
      spyOn(httpClient, 'delete').and.returnValue(Observable.throw('Could not delete employee'));

      const service: EmployeeService = new EmployeeService(httpClient, loggingService);

      let success = true;

      service.deleteEmployee(0).subscribe((ignored) => {
        // success = true;
      }, () => {
        success = false;
      });

      expect(success).toBeFalsy();
    }));
  });

  describe('updateEmployee', () => {
    it('should run without errors', inject([HttpClient, LoggingService],
      (httpClient: HttpClient, loggingService: LoggingService) => {
      const employee: Employee = new Employee(0, 'Testy', 'McTest');
      spyOn(httpClient, 'put').and.returnValue(Observable.of());

      const service: EmployeeService = new EmployeeService(httpClient, loggingService);

      expect(service.updateEmployee(employee)).toBeTruthy();
    }));

    it('should return error when update failed', inject([HttpClient, LoggingService],
      (httpClient: HttpClient, loggingService: LoggingService) => {
      const employee: Employee = new Employee(1, 'Testy', 'McTest');
      spyOn(httpClient, 'put').and.returnValue(Observable.throw('Could not update employee'));

      const service: EmployeeService = new EmployeeService(httpClient, loggingService);

      let success = true;

      service.updateEmployee(employee).subscribe(() => {

      }, () => {
        success = false;
      });

      expect(success).toBeFalsy();
    }));

  });
});
