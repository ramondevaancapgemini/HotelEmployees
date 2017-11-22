import { Injectable, ErrorHandler } from '@angular/core';
import { AlertService } from './alert.service';

@Injectable()
export class ErrorService implements ErrorHandler {

  constructor(private alertService: AlertService) { }

  handleError(error: any): void {
    if (error.message) {
      this.alertService.error(error.message, true);
    } else {
      this.alertService.error(error, true);
    }
    throw error;
  }

}
