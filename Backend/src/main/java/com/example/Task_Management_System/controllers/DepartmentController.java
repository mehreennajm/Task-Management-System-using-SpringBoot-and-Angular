package com.example.Task_Management_System.controllers;
import com.example.Task_Management_System.dto.DepartmentData;
import com.example.Task_Management_System.models.Department;
import com.example.Task_Management_System.services.interfaces.DepartmentService;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;
@CrossOrigin
@RestController
@RequestMapping(path = "api/departments")
public class DepartmentController {

        //Dependency injection with Department service resources
        private final DepartmentService  departmentService;
        public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
        }

        //list all of Departments
        @GetMapping
        public List<Department> getListOfDepartments(){
            return departmentService.getListOfDepartments();
        }

        // add a new department
        @PostMapping(path = "add-department")
        public void addNewDepartment(@RequestBody Department department){
                        departmentService.addNewDepartment(department);
        }

        // update department record
        @Transactional
        @PutMapping(path ="/{id}/edit")
        public Department updateDepartment(@RequestBody Department department,
                                     @PathVariable("id") Long departmentId)
        {
                departmentService.updateDepartment(department, departmentId);
                return department;
        }

        // delete department record
        @DeleteMapping(path = "{id}/delete")
        public void deleteDepartment(@PathVariable("id") Long departmentId){
                departmentService.deleteDepartment(departmentId);
        }

        //getting a specific task via id
        @GetMapping("/{id}")
        public Department displayTask(@PathVariable(value = "id") Long id){
                Department newDepartment = departmentService.getSpecificRecord(id);
                return newDepartment;
        }


}
