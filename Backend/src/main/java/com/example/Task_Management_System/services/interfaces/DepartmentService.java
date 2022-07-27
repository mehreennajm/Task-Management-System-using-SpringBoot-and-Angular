package com.example.Task_Management_System.services.interfaces;

import com.example.Task_Management_System.models.Department;
import java.util.List;

public interface DepartmentService {
    List<Department> getListOfDepartments();
    void addNewDepartment(Department department);
    void updateDepartment(Department department, Long departmentId);
    void deleteDepartment(Long departmentId);
    Department getSpecificRecord(Long id);

}
