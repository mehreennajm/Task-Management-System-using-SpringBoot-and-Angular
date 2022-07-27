package com.example.Task_Management_System.services.interfaces;
import com.example.Task_Management_System.dto.ProjectData;
import com.example.Task_Management_System.models.Project;

import java.util.List;

public interface ProjectService {
    List<ProjectData> getListOfProjects();

   void addNewProject(Project project);

    void updateProjectRecord(Long projectId, Project project);

    void deleteProject(Long projectId);
    Project getSpecificRecord(Long id);
}
