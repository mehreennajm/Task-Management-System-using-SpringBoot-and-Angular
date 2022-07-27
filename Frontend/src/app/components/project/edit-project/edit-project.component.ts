import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BsModalRef } from "ngx-bootstrap/modal";
import { Department } from "src/app/models/department-model";
import { Project } from "src/app/models/project-model";
import { ProjectService } from "../project-service";

@Component({
  selector: "app-edit-project",
  templateUrl: "./edit-project.component.html",
  styleUrls: ["./edit-project.component.css"],
})
export class EditProjectComponent implements OnInit {
  constructor(
    private bsModalRef: BsModalRef,
    private projectService: ProjectService,
    private formBuilder: FormBuilder
  ) {
    this.editForm = this.formBuilder.group({
      projectId: [null, Validators.required],
      name: ["", Validators.required],
      department: [null],
    });
  }

  @Input()
  project: Project;
  @Input()
  departments: Department[];

  editForm: FormGroup;

  @Input()
  selectedDepartment: string = "";

  ngOnInit(): void {
    this.editForm.patchValue({
      projectId: this.project.projectId,
      name: this.project.name,
      department: this.project.department,
    });
  }

  onSave(project: Project) {
    this.projectService.onUpdateProject(project).subscribe((results) => {
      this.projectService.getProjects();
      this.bsModalRef.hide();
    });
  }

  onClose() {
    this.bsModalRef.hide();
  }
}
