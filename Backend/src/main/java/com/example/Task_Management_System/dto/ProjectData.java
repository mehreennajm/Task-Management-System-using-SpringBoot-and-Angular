package com.example.Task_Management_System.dto;

import com.example.Task_Management_System.models.Department;
import lombok.Data;

@Data
public class ProjectData {
    private Long projectId;
    private String name;
    private String department;

}
