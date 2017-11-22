import { Injectable, ErrorHandler } from '@angular/core';
import { AlertService } from './alert.service';

@Injectable()
export class ErrorService implements ErrorHandler {

  constructor(private alertService: AlertService) { }

  handleError(error: any): void {
    if (error.message) {
      this.alertService.error(error.message);
    } else {
      this.alertService.error(error);
    }
    throw error;
  }

}
