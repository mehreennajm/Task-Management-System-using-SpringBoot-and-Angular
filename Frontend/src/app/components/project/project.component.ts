import { Component, OnInit, ViewChild } from "@angular/core";
import { Project } from "src/app/models/project-model";
import { NgForm} from "@angular/forms";
import { Department } from "src/app/models/department-model";
import { DepartmentService } from "../department/department-service";
import { ProjectService } from "./project-service";
import { EditProjectComponent } from "./edit-project/edit-project.component";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: "app-project",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.css"],
})
export class ProjectComponent implements OnInit {
  departments: Department[];
  projects: Project[];
  selectedDep : string = "";
  @ViewChild('f') form: NgForm;

  constructor(
    private bsModalService: BsModalService,
    public bsModalRef: BsModalRef, 
    private departmentService: DepartmentService,
    private projectService: ProjectService,
  ) {}

  ngOnInit(): void {
    this.projectService.getProjects();
    this.projectService.projectChanged.subscribe((p) => {
      this.projects = p;
    });
    this.departmentService.getDepartments();
    this.departmentService.departmentsChanged.subscribe((d) => {
      this.departments = d;
    });
  }

  open(content: any) {
    this.projectService.open(content);
  }

  private getDismissReason(reason: any){
    this.projectService.getDismissReason(reason);
  }

  onSubmit(form: NgForm) {
    this.projectService.onSubmit(form);
  }

  
  openEdit(project: Project):void {
    this.bsModalService.show(EditProjectComponent, {
      class: 'modal-dialog',
      initialState: {
        project: project,
        departments: this.departments,
        //@ts-ignore
        selectedDepartment : this.selectedDep = project.department
        
      }
    });
  }

  openDelete(targetModal: any, project: Project) {
    this.projectService.openDelete(targetModal,project);
  }

  onDelete() {
    this.projectService.onDelete();
  }
}
