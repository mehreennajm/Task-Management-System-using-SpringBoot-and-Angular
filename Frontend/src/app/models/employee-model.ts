import { Department } from "./department-model";

export class Employee {
    constructor(
      public employeeId: number,
      public firstName: string,
      public lastName: string,
      public position: string,
      public department: Department

    ) {
    }
  }