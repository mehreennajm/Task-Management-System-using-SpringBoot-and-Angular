package com.example.Task_Management_System.dto;

import com.example.Task_Management_System.models.Department;
import lombok.Data;

@Data
public class EmployeeData {
    private Long employeeId;
    private String firstName;
    private String lastName;
    private String position;
    private String department;

}
