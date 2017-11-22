import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {EmployeeAddComponent} from '../employee-add/employee-add.component';
import {EmployeeService} from "../service/employee.service";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {LoggingService} from "../service/logging.service";
import {RoutingModule} from "../routing/routing.module";
import {BrowserModule} from "@angular/platform-browser";
import {AngularFontAwesomeModule} from "angular-font-awesome";
import {AppComponent} from "../app.component";
import {EmployeeIndexComponent} from "./employee-index.component";
import {EmployeeEditComponent} from "../employee-edit/employee-edit.component";
import {EmployeeDetailComponent} from "../employee-detail/employee-detail.component";
import {EmployeeDeleteComponent} from "../employee-delete/employee-delete.component";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {NavbarComponent} from "../navbar/navbar.component";
import {AlertComponent} from "../alert/alert.component";
import {AlertService} from "../service/alert.service";
import {ErrorService} from "../service/error.service";
import {APP_BASE_HREF} from '@angular/common';

describe('EmployeeIndexComponent', () => {
  let component: EmployeeIndexComponent;
  let fixture: ComponentFixture<EmployeeIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RoutingModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AngularFontAwesomeModule,
      ],
      declarations: [
        AppComponent,
        EmployeeIndexComponent,
        EmployeeAddComponent,
        EmployeeEditComponent,
        EmployeeDetailComponent,
        EmployeeDeleteComponent,
        DashboardComponent,
        NavbarComponent,
        AlertComponent
      ],
      providers: [
//    { provide: ErrorHandler, useClass: ErrorService },
        {provide: APP_BASE_HREF, useValue: '/'},
        AlertService,
        ErrorService,
        EmployeeService,
        LoggingService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
