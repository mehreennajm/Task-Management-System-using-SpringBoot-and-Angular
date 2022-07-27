import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BsModalRef } from "ngx-bootstrap/modal";
import { Employee } from "src/app/models/employee-model";
import { Project } from "src/app/models/project-model";
import { TaskService } from "../task-service";
import { Task } from "src/app/models/task-model";

@Component({
  selector: "app-edit-task",
  templateUrl: "./edit-task.component.html",
  styleUrls: ["./edit-task.component.css"],
})
export class EditTaskComponent implements OnInit {
  @Input() selectedStatus = "";

  @Input() selectedProject: string = "";

  editForm: FormGroup;

  @Input()
  task: Task;

  @Input() employees: Employee[];

  @Input() projects: Project[];

  @Input() selectedEmployee: string = "";

 


  constructor(
    private bsModalRef: BsModalRef,
    private taskService: TaskService,
    private formBuilder: FormBuilder
  ) {
    this.editForm = this.formBuilder.group({
      taskId: [null, Validators.required],
      title: ["", Validators.required],
      createDate: ["", Validators.required],
      dueDate: ["", Validators.required],
      status: [""],
      description: [""],
      employee: [null],
      project: [null]
    });
  }

    ngOnInit(): void {
    this.editForm.patchValue({
      taskId: this.task.taskId,
      title: this.task.title,
      createDate: this.task.createDate,
      dueDate: this.task.dueDate,
      status: this.task.status,
      description: this.task.description,
      project: this.task.project,
      employee: this.task.employee,
    });
  }

  onSave(task:Task) {
    this.taskService.onUpdateTask(task).subscribe((results) => {
      this.taskService.getTasks();
      this.bsModalRef.hide();
    });
  }

  onClose() {
    this.bsModalRef.hide();
  }
}
