import { Injectable, Input, OnInit, Output } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Department } from "src/app/models/department-model";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable, Subject } from "rxjs";
import { FormBuilder, NgForm } from "@angular/forms";

@Injectable()
export class DepartmentService implements OnInit{
  closeResult: string;
  deleteId: number;
  departments: Department[];
  departmentsChanged=new Subject<Department[]>;
 

  constructor(
    private httpClient: HttpClient,
    private modalService: NgbModal,
  ) {}

  
  ngOnInit(): void {}

  getDepartments() {
    this.httpClient.get<any>("api/departments/").subscribe((response) => {
      this.departmentsChanged.next(response);
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

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit(f: NgForm) {
    const url = "api/departments/add-department";
    this.httpClient.post(url, f.value).subscribe((result) => {
      this.getDepartments();
    });
   
    this.modalService.dismissAll(); //dismiss the modal
  }

  updateDepartment(department: Department): Observable<any> {
    return this.httpClient.put(`api/departments/${department.departmentId}/edit`, department);
  }
  
  openDelete(targetModal: any, department: Department) {
    this.deleteId = department.departmentId;
    this.modalService.open(targetModal, {
      backdrop: "static",
      size: "lg",
    });
  }

  onDelete() {
    const deleteURL = "api/departments/" + this.deleteId + "/delete";
    this.httpClient.delete(deleteURL).subscribe((results) => {
      this.getDepartments();
      this.modalService.dismissAll();
    });
  }
}
