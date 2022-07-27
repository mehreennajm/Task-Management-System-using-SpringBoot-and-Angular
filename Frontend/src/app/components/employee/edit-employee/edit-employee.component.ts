import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/models/employee-model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Department } from 'src/app/models/department-model';
import { EmployeeService } from '../employee-service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  constructor(private bsModalRef: BsModalRef,
              private employeeService: EmployeeService,
              private formBuilder: FormBuilder) {

                this.editForm =  this.formBuilder.group({
                  employeeId: [null,Validators.required],
                  firstName: ['',Validators.required],
                  lastName:['',Validators.required],
                  position: ['',Validators.required],
                  department:[null]
                });

              }
              
  @Input()
  employee: Employee;
  @Input()
  departments: Department[];

  editForm: FormGroup;

  @Input()
  selectedDepartment: string = "";

  ngOnInit(): void {
    this.editForm.patchValue({
      employeeId: this.employee.employeeId,
      firstName: this.employee.firstName,
      lastName: this.employee.lastName,
      position: this.employee.position,
      department: this.employee.department
    })
  }

  onSave(employee :Employee) {
    this.employeeService.onUpdateEmployee(employee).subscribe((results) => {
      this.employeeService.getEmployees();
      this.bsModalRef.hide();
    }); 
  }
  
  onClose(){
    this.bsModalRef.hide()
  }

}
