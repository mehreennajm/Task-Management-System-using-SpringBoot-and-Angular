import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { HttpClientModule } from "@angular/common/http";
import { DepartmentComponent } from "./components/department/department.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EmployeeComponent } from "./components/employee/employee.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { TaskComponent } from "./components/task/task.component";
import { ProjectComponent } from "./components/project/project.component";
import { DepartmentService } from "./components/department/department-service";
import { EmployeeService } from "./components/employee/employee-service";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { EditProjectComponent } from "./components/project/edit-project/edit-project.component";
import { EditTaskComponent } from "./components/task/edit-task/edit-task.component";
import { EditDepartmentComponent } from "./components/department/edit-department/edit-department.component";
import { ProjectService } from "./components/project/project-service";
import { BsModalService } from "ngx-bootstrap/modal";
import { EditEmployeeComponent } from './components/employee/edit-employee/edit-employee.component';
import { TaskService } from "./components/task/task-service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DepartmentComponent,
    EmployeeComponent,
    PageNotFoundComponent,
    TaskComponent,
    ProjectComponent,
    SidebarComponent,
    EditProjectComponent,
    EditTaskComponent,
    EditDepartmentComponent,
    EditEmployeeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [FormBuilder, DepartmentService, EmployeeService, ProjectService,TaskService, BsModalService],
  bootstrap: [AppComponent],
})
export class AppModule {}
