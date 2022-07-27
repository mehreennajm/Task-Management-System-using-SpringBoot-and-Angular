import { Employee } from "./employee-model";
import { Project } from "./project-model";

export class Task {
    constructor(
      public  taskId: number,
      public title: string,
      public description:string,
      public createDate: string,
      public dueDate: string,
      public status:string,
      public employee: Employee,
      public project:Project ) {
    }
  }