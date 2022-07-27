package com.example.Task_Management_System.controllers;
import com.example.Task_Management_System.dto.ProjectData;
import com.example.Task_Management_System.models.Project;
import com.example.Task_Management_System.services.interfaces.ProjectService;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "api/projects")
public class ProjectController {

    //Dependency injection with Project service resources
    private final ProjectService projectService;
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }


    //list all of Projects
    @GetMapping
    public List<ProjectData> getListOfProjects(){
        return projectService.getListOfProjects();
    }

     //add a new Project Record
    @PostMapping(path = "/add-project")
    public void addNewProject(@RequestBody Project project){
        projectService.addNewProject(project);
    }
//
    // update Project record
    @Transactional
    @PutMapping(path ="/{id}/edit")
    public Project updateProjectRecord(@PathVariable("id") Long projectId ,
                                    @RequestBody Project project){
        projectService.updateProjectRecord(projectId,project);
        return project;
    }

    //delete project record
    @DeleteMapping(path = "/{id}/delete")
    public void deleteProject(@PathVariable("id") Long projectId){
        projectService.deleteProject(projectId);
    }

    //getting a specific project via id
    @GetMapping("/{id}")
    public Project displayProject(@PathVariable(value = "id") Long id){
        Project newProject = projectService.getSpecificRecord(id);
        return newProject;
    }

}
