import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { EmployeeAddComponent } from './employee-add.component';
import { EmployeeService } from '../service/employee.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoggingService } from '../service/logging.service';
import { RoutingModule } from '../routing/routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppComponent } from '../app.component';
import { EmployeeIndexComponent } from '../employee-index/employee-index.component';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';
import { EmployeeDetailComponent } from '../employee-detail/employee-detail.component';
import { EmployeeDeleteComponent } from '../employee-delete/employee-delete.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { AlertComponent } from '../alert/alert.component';
import { AlertService } from '../service/alert.service';
import { ErrorService } from '../service/error.service';
import { APP_BASE_HREF } from '@angular/common';
import { ErrorHandler } from '@angular/core';
import { Employee } from '../model/Employee';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import 'rxjs/add/observable/of';

describe('EmployeeAddComponent', () => {
  let component: EmployeeAddComponent;
  let fixture: ComponentFixture<EmployeeAddComponent>;
  let employeeService: EmployeeService;

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
        { provide: ErrorHandler, useClass: ErrorService },
        { provide: APP_BASE_HREF, useValue: '/' },
        AlertService,
        EmployeeService,
        LoggingService,
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(EmployeeAddComponent);
        employeeService = fixture.debugElement.injector.get(EmployeeService);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when initialized', () => {
    it('the component should contain an empty employee', () => {
      expect(_.isEqual(component.model, new Employee(-1, '', ''))).toBeTruthy();
    });
  });

  describe('when the add button is clicked', () => {
    it('should not be loading', () => {
      expect(component.adding).toBeFalsy();
    });
    it('it should add a new employee', fakeAsync(() => {
      const spy = spyOn(employeeService, 'addEmployee').and.returnValue(Observable.of({ id: 1, firstName: 'First', lastName: 'Last' }));
      component.onSubmit();
      fixture.detectChanges();
      expect(spy.calls.any()).toEqual(true);
    }));
  });
});
