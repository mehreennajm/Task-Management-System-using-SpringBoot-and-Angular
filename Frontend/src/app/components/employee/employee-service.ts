import { Injectable } from "@angular/core";
import {OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Employee } from "src/app/models/employee-model";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  FormBuilder,
  FormGroup,
  NgForm,
} from "@angular/forms";
import { Department } from "src/app/models/department-model";
import { Observable, Subject } from "rxjs";

@Injectable()
export class EmployeeService implements OnInit {
  employees: Employee[];
  closeResult: string;
  editForm: FormGroup;
  deleteId: number;
  departments: Department[];
  employeeChanged=new Subject<Employee[]>;

  constructor(
    private httpClient: HttpClient,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {}


  ngOnInit() {
    this.editForm = this.formBuilder.group({
      id: [""],
      firstName: [""],
      lastName: [""],
      position: [""],
      department: [null],
    });
  }

  getEmployees() {
    this.httpClient.get<any>("api/employees/").subscribe((response) => {
      this.employeeChanged.next(response);
    });
  }

  openCreateModal(content: any) {
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

  onSubmitEmployee(f: NgForm) {
    const url = "api/employees/add-employee";
    this.httpClient.post(url, f.value).subscribe((results) => {
      this.getEmployees();
      this.modalService.dismissAll();
    });
  }


  onUpdateEmployee(employee: Employee): Observable<any> {
    return this.httpClient.put(`api/employees/${employee.employeeId}/edit`, employee);
  }

  openDeleteModal(targetModal: any, employee: Employee) {
    this.deleteId = employee.employeeId;
    this.modalService.open(targetModal, {
      backdrop: "static",
      size: "lg",
    });
  }

  onDeleteEmployee() {
    const deleteURL = "api/employees/" + this.deleteId + "/delete";
    this.httpClient.delete(deleteURL).subscribe((results) => {
      this.getEmployees();
      this.modalService.dismissAll();
    });
  }
}
