import {TestBed, async} from '@angular/core/testing';
import {EmployeeAddComponent} from './employee-add/employee-add.component';
import {EmployeeService} from "./service/employee.service";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {LoggingService} from "./service/logging.service";
import {RoutingModule} from "./routing/routing.module";
import {BrowserModule} from "@angular/platform-browser";
import {AngularFontAwesomeModule} from "angular-font-awesome";
import {AppComponent} from "./app.component";
import {EmployeeIndexComponent} from "./employee-index/employee-index.component";
import {EmployeeEditComponent} from "./employee-edit/employee-edit.component";
import {EmployeeDetailComponent} from "./employee-detail/employee-detail.component";
import {EmployeeDeleteComponent} from "./employee-delete/employee-delete.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {AlertComponent} from "./alert/alert.component";
import {AlertService} from "./service/alert.service";
import {ErrorService} from "./service/error.service";
import {APP_BASE_HREF} from '@angular/common';
import {ErrorHandler} from "@angular/core";

describe('AppComponent', () => {
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
        {provide: ErrorHandler, useClass: ErrorService},
        {provide: APP_BASE_HREF, useValue: '/'},
        AlertService,
        EmployeeService,
        LoggingService,
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
});
