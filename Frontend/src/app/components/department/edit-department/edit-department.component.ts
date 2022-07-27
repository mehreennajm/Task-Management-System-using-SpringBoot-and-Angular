import { Component, Input,OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Department } from 'src/app/models/department-model';
import { DepartmentService } from '../department-service';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.css']
})
export class EditDepartmentComponent implements OnInit {

  @Input()
  department: Department;
  editForm: FormGroup;
  constructor( private bsModalRef: BsModalRef,
               private formBuilder: FormBuilder,
               private departmentService: DepartmentService) { 

                this.editForm =  this.formBuilder.group({
                  departmentId: null,
                  name: '',
                });
               
              }
               

  ngOnInit(): void {
    this.editForm.patchValue({
      departmentId: this.department.departmentId,
      name: this.department.name
    })
  }

  onSave(department: Department) {
    this.departmentService.updateDepartment(department).subscribe((results) => {
      this.departmentService.getDepartments();
      this.bsModalRef.hide();
    }); 
  }

  onClose(){
    this.bsModalRef.hide()
  }

}
