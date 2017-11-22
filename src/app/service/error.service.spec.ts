import { TestBed, inject } from '@angular/core/testing';

import {EmployeeAddComponent} from '../employee-add/employee-add.component';
import {EmployeeService} from "../service/employee.service";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {LoggingService} from "../service/logging.service";
import {RoutingModule} from "../routing/routing.module";
import {BrowserModule} from "@angular/platform-browser";
import {AngularFontAwesomeModule} from "angular-font-awesome";
import {AppComponent} from "../app.component";
import {EmployeeIndexComponent} from "../employee-index/employee-index.component";
import {EmployeeEditComponent} from "../employee-edit/employee-edit.component";
import {EmployeeDetailComponent} from "../employee-detail/employee-detail.component";
import {EmployeeDeleteComponent} from "../employee-delete/employee-delete.component";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {NavbarComponent} from "../navbar/navbar.component";
import {AlertComponent} from "../alert/alert.component";
import {AlertService} from "./alert.service";
import {ErrorService} from "./error.service";
import {APP_BASE_HREF} from '@angular/common';

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
