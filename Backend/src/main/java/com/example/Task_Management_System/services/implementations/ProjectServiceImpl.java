package com.example.Task_Management_System.services.implementations;
import com.example.Task_Management_System.dto.ProjectData;
import com.example.Task_Management_System.errors.ErrorMessages;
import com.example.Task_Management_System.models.Project;
import com.example.Task_Management_System.repositories.DepartmentRepository;
import com.example.Task_Management_System.repositories.ProjectRepository;
import com.example.Task_Management_System.services.interfaces.ProjectService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service

public class ProjectServiceImpl implements ProjectService {
    private final DepartmentRepository departmentRepository;
    private final ProjectRepository projectRepository;
    public ProjectServiceImpl(DepartmentRepository departmentRepository,
                              ProjectRepository projectRepository) {
        this.departmentRepository = departmentRepository;
        this.projectRepository = projectRepository;
    }

    @Override
    public List < ProjectData > getListOfProjects() {
        List < ProjectData > projectDataList = new ArrayList < > ();
        List < Project > projects = projectRepository.findAll();
        for (Project project: projects) {
            projectDataList.add(convertToDto(project));
        }
        return projectDataList;
    }

    @Override
    public Project getSpecificRecord(Long id) {
        Optional < Project > projectOptional = projectRepository.findById(id);
        Project newProject = null;
        if (projectOptional.isPresent()) {
            newProject = projectOptional.get();
        } else {
            throw new IllegalStateException(ErrorMessages.ID_NOT_FOUND_ERROR);
        }
        return newProject;
    }

    @Override
    public void addNewProject(Project project) {
        projectRepository.save(project);
    }

    @Transactional
    @Override
    public void updateProjectRecord(Long projectId, Project project) {

        Project project1 = projectRepository.findById(projectId).orElseThrow(() ->
                new IllegalStateException(ErrorMessages.ID_NOT_FOUND_ERROR));
        project1.setName(project.getName());
        project1.setDepartment(project.getDepartment());
        this.projectRepository.save(project);
    }

    @Override
    public void deleteProject(Long projectId) {
        Project project = projectRepository.findById(projectId).orElseThrow(() ->
                new IllegalStateException(ErrorMessages.ID_NOT_FOUND_ERROR));
        this.projectRepository.delete(project);
    }

    @Autowired
    private ModelMapper modelMapper;
    private ProjectData convertToDto(Project project) {
        ProjectData projectDto = modelMapper.map(project, ProjectData.class);
        projectDto.setDepartment(project.getDepartment().getName());
        return projectDto;
    }

}