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
import { EmployeeIndexComponent } from './employee-index.component';
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
import { Observable } from 'rxjs';
import { Employee } from '../model/Employee';
import * as _ from 'lodash';
import { UserData } from '../model/UserData';

describe('EmployeeIndexComponent', () => {
  let component: EmployeeIndexComponent;
  let fixture: ComponentFixture<EmployeeIndexComponent>;
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
        fixture = TestBed.createComponent(EmployeeIndexComponent);
        employeeService = fixture.debugElement.injector.get(EmployeeService);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when the page is loaded', () => {
    let spy: jasmine.Spy;
    let data: UserData;
    beforeEach(() => {
      data = { totalPages: 3, pageLimit: 2, currentPage: 1, employees: [{ id: 1, firstName: "First", lastName: "Last" }] };
      spy = spyOn(employeeService, 'getEmployees').and.returnValue(Observable.of(data));
    })
    it('the list of employees should be requested', () => {
      component.ngOnInit();
      expect(spy.calls.any()).toBeTruthy();
    });
    it('the employees should be loaded', () => {
      component.ngOnInit();
      expect(_.isEqual(component.employees, data.employees)).toBeTruthy();
    });
    it('the pagination be loaded', () => {
      component.ngOnInit();
      expect(component.totalPages).toBe(3);
      expect(component.pageLimit).toBe(2);
      expect(component.currentPage).toBe(1);
    });
    describe('and the requested page is larger than the number of pages', () => {
      it('the last page should be loaded', () => {
        data['totalPages'] = 1;
        data['currentPage'] = 3;
        component.ngOnInit();
        expect(component.currentPage).toBe(1);
      });
    });
  });

  describe('when a table page is requested', () => {
    it('the list of employees should be loaded', () => {
      let data = { totalPages: 3, pageLimit: 2, currentPage: 1, employees: [{ id: 1, firstName: "First", lastName: "Last" }] };
      let spy = spyOn(employeeService, 'getEmployees').and.returnValue(Observable.of(data));
      component.loadPage(1);
      expect(spy.calls.any()).toBeTruthy();
    });
    it('the requested page should be loaded', () => {
      let data = { totalPages: 3, pageLimit: 2, currentPage: 2, employees: [{ id: 1, firstName: "First", lastName: "Last" }] };
      spyOn(employeeService, 'getEmployees').and.returnValue(Observable.of(data));
      component.loadPage(2);
      expect(component.currentPage).toBe(2);
    })
    describe('and the requested page was negative', () => {
      it('the first page should be loaded', () => {
        component.loadPage(-4);
        spyOn(employeeService, 'getEmployees').and.callFake(function () {
          expect(arguments[0].template).toEqual(1);
        });
      });
    });
    describe('and the requested page is larger than the last page', () => {
      it('the last page should be loaded', () => {
        component.loadPage(100);
        spyOn(employeeService, 'getEmployees').and.callFake(function () {
          expect(arguments[0].template).toEqual(3);
        });
      });
    });
  });

  describe('when an amount of employees is requested', () => {
    it('the first page of employees should be loaded', () => {
      let data = { totalPages: 3, pageLimit: 2, currentPage: 5, employees: [{ id: 1, firstName: "First", lastName: "Last" }] };
      component.loadAmount(1);
      spyOn(employeeService, 'getEmployees').and.callFake(function () {
        expect(arguments[0].template).toEqual(1);
      });
    });
    it('that many employees should be displayed', () => {
      let employeeList = [{ id: 1, firstName: "First", lastName: "Last" }, { id: 2, firstName: "First", lastName: "Last" }];
      let data = { totalPages: 3, pageLimit: 2, currentPage: 1, employees: employeeList };
      spyOn(employeeService, 'getEmployees').and.returnValue(Observable.of(data));
      component.loadAmount(2);
      expect(component.employees.length).toBe(2);
    })
  })
});