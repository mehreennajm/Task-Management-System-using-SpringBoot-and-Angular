package com.example.Task_Management_System.dto;

import com.example.Task_Management_System.models.Employee;
import com.example.Task_Management_System.models.Project;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TaskData {
    private  Long taskId;
    private String title;
    private String description;
    private LocalDate createDate;
    private LocalDate dueDate;
    private String status;
    private String employee;
    private String project;
}
