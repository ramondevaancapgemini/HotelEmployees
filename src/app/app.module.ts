import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { EmployeeIndexComponent } from './employee-index/employee-index.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeDeleteComponent } from './employee-delete/employee-delete.component';
import { EmployeeService } from './service/employee.service';
import { ErrorService } from './service/error.service';
import { LoggingService } from './service/logging.service';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoutingModule } from './routing/routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './service/alert.service';


@NgModule({
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
    AlertService,
    ErrorService,
    EmployeeService,
    LoggingService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
