import {TestBed, inject} from '@angular/core/testing';

import {LoggingService} from './logging.service';

describe('LoggingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggingService]
    });
  });

  it('should be created', inject([LoggingService], (service: LoggingService) => {
    expect(service).toBeTruthy();
  }));

  describe('Messages', () => {
    beforeEach(() => {
      spyOn(console, 'log');
      // console.log = jasmine.createSpy('log');
      // service.add('Test-message');
    });

    it('should call the console logging function', inject([LoggingService], (service: LoggingService) => {
      service.add('Call');
      expect(console.log).toHaveBeenCalled();
    }));

    it('should equal the console output', inject([LoggingService], (service: LoggingService) => {
      service.add('Test-message');
      expect(console.log).toHaveBeenCalledWith('Test-message');
    }));
  });
});
