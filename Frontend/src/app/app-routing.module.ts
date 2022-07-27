import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from './components/department/department.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProjectComponent } from './components/project/project.component';
import { TaskComponent } from './components/task/task.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path: 'home', component: HomeComponent},
  {path:'departments',component:DepartmentComponent},
  {path:'employees',component:EmployeeComponent},
  {path:'projects',component:ProjectComponent},
  {path:'tasks',component:TaskComponent},
  {path: '**', component:PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
