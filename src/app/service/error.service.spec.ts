import {TestBed, inject} from '@angular/core/testing';

import {EmployeeService} from './employee.service';
import {LoggingService} from './logging.service';
import {AlertService} from './alert.service';
import {ErrorService} from './error.service';

describe('ErrorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [],
      providers: [
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

  describe('Messages', () => {
    it('should throw errors (to be logged in console)',
      inject([ErrorService], (service: ErrorService) => {
        expect(() => service.handleError('test')).toThrow('test');
      })
    );

    it('should be forwarded to AlertService error stream', () => {
      const alertService = new AlertService();
      const spy = spyOn(alertService, 'error');

      const errorService = new ErrorService(alertService);

      expect(spy).not.toHaveBeenCalled();

      try {
        errorService.handleError('Error-message');
      } catch (e) {

      }

      expect(spy).toHaveBeenCalledWith('Error-message');
    });
  });
});
