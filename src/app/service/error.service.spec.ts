import { TestBed, inject } from '@angular/core/testing';

import {EmployeeService} from './employee.service';
import {LoggingService} from './logging.service';
import {AlertService} from './alert.service';
import {ErrorService} from './error.service';

describe('ErrorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [
      ],
      providers: [
//    { provide: ErrorHandler, useClass: ErrorService },
        AlertService,
        ErrorService,
        EmployeeService,
        LoggingService,
      ]
    });
  });

  it('should be created', inject([ErrorService], (service: ErrorService) => {
    expect(service).toBeTruthy();
  }));
});
