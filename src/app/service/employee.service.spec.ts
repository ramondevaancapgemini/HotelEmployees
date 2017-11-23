import {TestBed, inject} from '@angular/core/testing';

import {EmployeeService} from './employee.service';
import {HttpClientModule} from '@angular/common/http';
import {LoggingService} from './logging.service';
import {AlertService} from './alert.service';
import {ErrorService} from './error.service';
import {ErrorHandler} from '@angular/core';

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
});
