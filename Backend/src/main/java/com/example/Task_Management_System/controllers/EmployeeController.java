package com.example.Task_Management_System.controllers;
import com.example.Task_Management_System.dto.EmployeeData;
import com.example.Task_Management_System.models.Employee;
import com.example.Task_Management_System.services.interfaces.EmployeeService;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "api/employees")
public class EmployeeController {

    //Dependency injection with Project service resources
    private final EmployeeService employeeService;


    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    //list all of Employees
    @GetMapping
    public List<EmployeeData> getListOfEmployees(){
        return employeeService.getListOfEmployees();
    }

    //add a new Employee Record
    @PostMapping(path = "/add-employee")
    public void addNewEmployee(@RequestBody Employee employee){
        employeeService.addNewEmployee(employee);
    }

    // update Employee record
    @Transactional
    @PutMapping(path ="/{id}/edit")
    public Employee updateProjectRecord(@RequestBody Employee employee,
                                        @PathVariable("id") Long employeeId){
        employeeService.updateEmployeeRecord(employeeId,employee);
        return employee;
    }

    //delete Employee record
    @DeleteMapping(path = "/{id}/delete")
    public void deleteProject(@PathVariable("id") Long employeeId){
        employeeService.deleteEmployee(employeeId);
    }

    //getting a specific task via id
    @GetMapping("/{id}")
    public Employee displayTask(@PathVariable(value = "id") Long id){
        Employee newEmployee = employeeService.getSpecificRecord(id);
        return newEmployee;
    }
}
