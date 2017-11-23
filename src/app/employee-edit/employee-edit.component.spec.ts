import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAddComponent } from '../employee-add/employee-add.component';
import { EmployeeService } from '../service/employee.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoggingService } from '../service/logging.service';
import { RoutingModule } from '../routing/routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppComponent } from '../app.component';
import { EmployeeIndexComponent } from '../employee-index/employee-index.component';
import { EmployeeEditComponent } from './employee-edit.component';
import { EmployeeDetailComponent } from '../employee-detail/employee-detail.component';
import { EmployeeDeleteComponent } from '../employee-delete/employee-delete.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { AlertComponent } from '../alert/alert.component';
import { AlertService } from '../service/alert.service';
import { ErrorService } from '../service/error.service';
import { APP_BASE_HREF } from '@angular/common';
import { ErrorHandler } from '@angular/core';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

describe('EmployeeEditComponent', () => {
  let component: EmployeeEditComponent;
  let fixture: ComponentFixture<EmployeeEditComponent>;
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
        fixture = TestBed.createComponent(EmployeeEditComponent);
        employeeService = fixture.debugElement.injector.get(EmployeeService);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when the page is loaded', () => {
    it('the employee should be retrieved from the database', () => {
      const employee = { id: 1, firstName: "First", lastName: "Last" };
      const spy = spyOn(employeeService, 'getEmployee').and.returnValue(Observable.of(employee));
      component.ngOnInit();
      expect(_.isEqual(component.model, employee)).toBeTruthy();
    });
    it('an error should be thrown when requesting an invalid employee', () => {
      const spy = spyOn(employeeService, 'getEmployee').and.returnValue(Observable.throw("Wrong id"));
      component.ngOnInit();
      expect(component.model).toBeUndefined();
    });
    describe('and the values are changed', () => {
      let original;
      beforeEach(() => {
        original = component.model;
        component.model = { id: 2, firstName: "Another", lastName: "Employee" };
      });
      it('they should not be the same as the original', () => {
        expect(_.isEqual(component.model, component.original)).toBeFalsy;
      });
      describe('and the reset button is clicked', () => {
        it('the values should be the same as the original', () => {
          component.resetEmployee();
          expect(_.isEqual(component.model, original)).toBeTruthy();
        });
      })
    });
  });

  describe('when the edit button is clicked', () => {
    it('the employee should be updated', () => {
      const employee = { id: 1, firstName: "First", lastName: "Last" };
      const spy = spyOn(employeeService, 'updateEmployee').and.returnValue(Observable.of(employee));
      component.onSubmit();
      expect(spy.calls.any()).toBeTruthy();
    });
  });




});