import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { EmployeeIndexComponent } from './employee-index/employee-index.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeDeleteComponent } from './employee-delete/employee-delete.component';
import { EmployeeService } from './employee.service';
import { ErrorService } from './error.service';
import { LoggingService } from './logging.service';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeIndexComponent,
    EmployeeAddComponent,
    EmployeeEditComponent,
    EmployeeDetailComponent,
    EmployeeDeleteComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [EmployeeService, ErrorService, LoggingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
