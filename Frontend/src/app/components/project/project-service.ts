import { Injectable, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, NgForm } from "@angular/forms";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Department } from "src/app/models/department-model";
import { Project } from "src/app/models/project-model";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";

@Injectable()
export class ProjectService implements OnInit {
  closeResult: string;
  editForm: FormGroup;
  departments: Department[];
  projects: Project[];
  deleteId: number;
  selectedDepartment: string = "";
  projectChanged=new Subject<Project[]>;

  constructor(
    private httpClient: HttpClient,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      projectId: [""],
      name: [""],
      department: [null],
    });
  }

  getProjects() {
    this.httpClient.get<any>("api/projects/").subscribe((response) => {
      this.projectChanged.next(response);
    });
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  public getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit(f: NgForm) {
    const url = "api/projects/add-project";
    console.log(f.value);
    this.httpClient.post(url, f.value).subscribe((result) => {
      this.getProjects();
    });
    this.modalService.dismissAll(); //dismiss the modal
  }

  onUpdateProject(project: Project): Observable<any> {
    return this.httpClient.put(`api/projects/${project.projectId}/edit`, project);
  }


  openDelete(targetModal: any, project: Project) {
    this.deleteId = project.projectId;
    this.modalService.open(targetModal, {
      backdrop: "static",
      size: "lg",
    });
  }

  onDelete() {
    const deleteURL = "api/projects/" + this.deleteId + "/delete";
    this.httpClient.delete(deleteURL).subscribe((results) => {
      this.getProjects();
      this.modalService.dismissAll();
    });
  }
}
