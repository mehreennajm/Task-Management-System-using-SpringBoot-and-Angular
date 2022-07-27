import { Department } from "./department-model";

export class Project {
    constructor(
      public projectId: number,
      public name: string,
      public department: Department

    ) {
    }
  }