import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

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
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';
import { EmployeeDetailComponent } from '../employee-detail/employee-detail.component';
import { EmployeeDeleteComponent } from './employee-delete.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { AlertComponent } from '../alert/alert.component';
import { AlertService } from '../service/alert.service';
import { ErrorService } from '../service/error.service';
import { APP_BASE_HREF } from '@angular/common';
import { ErrorHandler } from '@angular/core';
import * as _ from 'lodash';
import {Observable} from 'rxjs/Observable';

describe('EmployeeDeleteComponent', () => {
  let component: EmployeeDeleteComponent;
  let fixture: ComponentFixture<EmployeeDeleteComponent>;
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
        fixture = TestBed.createComponent(EmployeeDeleteComponent);
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
      const employee = { id: 1, firstName: 'First', lastName: 'Last' };
      const spy = spyOn(employeeService, 'getEmployee').and.returnValue(Observable.of(employee));
      component.ngOnInit();
      expect(_.isEqual(component.model, employee)).toBeTruthy();
    });
  });

  describe('when the delete button is clicked', () => {
    it('the page should not be loading', () => {
      expect(component.deleting).toBeFalsy();
    });
    it('it should delete an employee', fakeAsync(() => {
      const spy = spyOn(employeeService, 'deleteEmployee').and.returnValue(Observable.of({ id: 1, firstName: 'First', lastName: 'Last' }));
      component.doDelete();
      expect(spy.calls.any()).toEqual(true);
    }));
  });
});
