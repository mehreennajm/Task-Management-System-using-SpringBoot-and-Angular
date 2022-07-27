package com.example.Task_Management_System.controllers;
import com.example.Task_Management_System.dto.TaskData;
import com.example.Task_Management_System.models.Task;
import com.example.Task_Management_System.services.interfaces.TaskService;
import org.springframework.data.repository.query.Param;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequestMapping(path = "api/tasks")
public class TaskController {

    //Dependency injection with Task service resources
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    //list all of Tasks
    @GetMapping
    public List<TaskData> getListOfTasks(){
        return taskService.getListOfTasks();
    }


    // return list of tasks by searching the title
    @GetMapping("/search")
    public List<?> searchTask(String title) {
        List<?> listTasks = taskService.searchTask(title);
        return listTasks;
    }

    //getting a specific task via id
    @GetMapping("/{id}")
    public Task displayTask(@PathVariable(value = "id") Long taskId){
        Task newTask = taskService.getSpecificRecord(taskId);
        return newTask;
    }


    //add a new Task Record
    @PostMapping(path = "add-task")
    public void addNewTask(@RequestBody Task task){
        taskService.addNewTask(task);
    }

    // update Project record
    @Transactional
    @PutMapping(path ="/{id}/edit")
    public Task updateTaskRecord(@PathVariable("id") Long taskId ,
                                    @RequestBody Task task){
        taskService.updateTaskRecord(taskId,task);
        return task;
    }

    //delete task record
    @DeleteMapping(path = "/{id}/delete")
    public void deleteTask(@PathVariable("id") Long taskId){
        taskService.deleteTask(taskId);
    }

}
