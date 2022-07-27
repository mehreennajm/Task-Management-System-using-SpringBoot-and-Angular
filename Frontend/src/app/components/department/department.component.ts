import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { Department } from "src/app/models/department-model";
import { NgForm } from "@angular/forms";
import { DepartmentService } from "./department-service";
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import { EditDepartmentComponent } from "./edit-department/edit-department.component";

@Component({
  selector: "app-department",
  templateUrl: "./department.component.html",
  styleUrls: ["./department.component.css"],
})
export class DepartmentComponent implements OnInit, OnChanges {
  
  departments: Department[];
  @ViewChild('f') form: NgForm;
 
 
  constructor(
    private departmentService: DepartmentService,
    private modalService: BsModalService,
    public bsModalRef: BsModalRef, 
  ) {
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.departmentService.getDepartments();
    this.departmentService.departmentsChanged.subscribe((d) => {
      this.departments = d;
    });
  }

  ngOnInit() {
    this.departmentService.getDepartments();
    this.departmentService.departmentsChanged.subscribe((d) => {
      this.departments = d;
    });
  }

 
  open(content: any) {
    this.departmentService.open(content);
  }

  getDismissReason(reason: any) {
    this.departmentService.getDismissReason(reason);
  }

  onSubmit(f: NgForm) {
    this.departmentService.onSubmit(f);
  }


  openEdit(department: Department):void {
    this.modalService.show(EditDepartmentComponent, {
      class: 'modal-dialog',
      initialState: {
        department: department
      }
    });
}

  openDelete(targetModal: any, department: Department) {
    this.departmentService.openDelete(targetModal, department);
  }

  onDelete() {
    this.departmentService.onDelete();
  }

  
}
