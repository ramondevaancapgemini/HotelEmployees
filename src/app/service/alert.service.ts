import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { AlertType } from '../model/AlertType';
import { Alert } from '../model/Alert';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AlertService {
  private subject = new Subject<Alert>();

  constructor() {}

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  success(message: string) {
    this.alert(AlertType.Success, message);
  }

  error(message: string) {
    this.alert(AlertType.Error, message);
  }

  info(message: string) {
    this.alert(AlertType.Info, message);
  }

  warn(message: string) {
    this.alert(AlertType.Warning, message);
  }

  alert(type: AlertType, message: string) {
    this.subject.next(<Alert>{ type: type, message: message });
  }

  clear() {
    this.subject.next();
  }
}
