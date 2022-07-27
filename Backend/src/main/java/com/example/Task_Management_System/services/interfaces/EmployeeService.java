package com.example.Task_Management_System.services.interfaces;

import com.example.Task_Management_System.dto.EmployeeData;
import com.example.Task_Management_System.models.Employee;

import java.util.List;

public interface EmployeeService {
    List<EmployeeData> getListOfEmployees();

    void addNewEmployee(Employee employee);

    void updateEmployeeRecord(Long employeeId, Employee employee);

    void deleteEmployee(Long employeeId);
    Employee getSpecificRecord(Long id);
}
