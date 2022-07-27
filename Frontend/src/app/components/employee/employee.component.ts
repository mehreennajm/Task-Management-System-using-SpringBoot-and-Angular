import { Component, OnInit, ViewChild} from "@angular/core";
import { Employee } from "src/app/models/employee-model";
import {NgForm} from "@angular/forms";
import { Department } from "src/app/models/department-model";
import { DepartmentService } from "../department/department-service";
import { EmployeeService } from "./employee-service";
import { EditEmployeeComponent } from "./edit-employee/edit-employee.component";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"],
})
export class EmployeeComponent implements OnInit {
  employees: Employee[];
  departments: Department[];
  selectedDep : string = "";
  @ViewChild('f') form: NgForm;

  constructor(
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    private bsModalService: BsModalService,
    public bsModalRef: BsModalRef, 
  ) {}

  ngOnInit(): void {
    this.employeeService.getEmployees();
    this.employeeService.employeeChanged.subscribe((emp) => {
      this.employees = emp;
    });
    this.departmentService.getDepartments();
    this.departmentService.departmentsChanged.subscribe((d) => {
      this.departments = d;
    });
  }


  open(content: any) {
    this.employeeService.openCreateModal(content);
  }

  private getDismissReason(reason: any){
    this.employeeService.getDismissReason(reason);
  }

  onSubmit(form: NgForm) {
   this.employeeService.onSubmitEmployee(form);
   this.ngOnInit();
  }


  openEdit(employee: Employee):void {
    this.bsModalService.show(EditEmployeeComponent, {
      class: 'modal-dialog',
      initialState: {
        employee: employee,
        departments: this.departments,
        //@ts-ignore
        selectedDepartment : this.selectedDep = employee.department
        
      }
    });
  }

  openDelete(targetModal: any, employee: Employee) {
   this.employeeService.openDeleteModal(targetModal,employee);
  }

  onDelete() {
    this.employeeService.onDeleteEmployee();
    this.ngOnInit();
  }
}
