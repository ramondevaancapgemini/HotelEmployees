import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { EmployeeIndexComponent } from '../employee-index/employee-index.component';
import { EmployeeDetailComponent } from '../employee-detail/employee-detail.component';
import { EmployeeDeleteComponent } from '../employee-delete/employee-delete.component';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';
import {EmployeeAddComponent} from '../employee-add/employee-add.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add', component: EmployeeAddComponent },
  { path: 'detail/:id', component: EmployeeDetailComponent },
  { path: 'edit/:id', component: EmployeeEditComponent },
  { path: 'delete/:id', component: EmployeeDeleteComponent },
  { path: 'employees', component: EmployeeIndexComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class RoutingModule { }
