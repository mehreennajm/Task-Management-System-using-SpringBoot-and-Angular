
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormGroup, NgForm, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Employee } from "src/app/models/employee-model";
import { Project } from "src/app/models/project-model";
import { Task } from "src/app/models/task-model";
import { EmployeeService } from "../employee/employee-service";
import { ProjectService } from "../project/project-service";
import { EditTaskComponent } from "./edit-task/edit-task.component";
import { TaskService } from "./task-service";

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.css"],
})
export class TaskComponent implements OnInit {
  tasks: Task[];
  employees: Employee[];
  projects: Project[];
  selectedStatus = "";
  selectedEmp : string = "";
  selectedProject : string = "";
  @ViewChild('f') form: NgForm;

  constructor(
    private bsModalService: BsModalService,
    private modalService: NgbModal,
    public bsModalRef: BsModalRef, 
    private projectService: ProjectService,
    private employeeService: EmployeeService,
    private taskService: TaskService,
  ) {}

  ngOnInit(): void {
    
    this.taskService.getTasks();
    this.taskService.taskChanged.subscribe((t) => {
      this.tasks = t;
    });

    this.projectService.getProjects();
    this.projectService.projectChanged.subscribe((p) => {
      this.projects = p;
    });

    this.employeeService.getEmployees();
    this.employeeService.employeeChanged.subscribe((e) => {
      this.employees = e;
    });

  }
  
  task:Task;
  //display the details in modal
  openDetails(targetModal: any,task: Task) {
    this.taskService.openDetails(targetModal,task);
      this.task = task;
  }
  
  open(content: any) {
    this.taskService.openCreateModal(content);
  }

  private getDismissReason(reason: any) {
   this.taskService.getDismissReason(reason);
  }

  onSubmit(form: NgForm) {
   this.taskService.onSubmit(form);
  }

  openEdit(task: Task):void {
    this.bsModalService.show(EditTaskComponent, {
      class: 'modal-dialog',
      initialState: {
        task: task,
        projects: this.projects,
        employees: this.employees,
        selectedStatus: this.selectedStatus = task.status,
        //@ts-ignore
        selectedEmployee : this.selectedEmp = task.employee,
        //@ts-ignore
        selectedProject : this.selectedProject = task.project,     
      }
    });
  }  
  
  openDelete(targetModal: any, task: Task) {
   this.taskService.openDelete(targetModal,task);
  }

  onDelete() {
   this.taskService.onDelete();
  }
}
