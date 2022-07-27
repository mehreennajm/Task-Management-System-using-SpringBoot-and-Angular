package com.example.Task_Management_System.services.implementations;
import com.example.Task_Management_System.dto.TaskData;
import com.example.Task_Management_System.errors.ErrorMessages;
import com.example.Task_Management_System.models.Task;
import com.example.Task_Management_System.repositories.EmployeeRepository;
import com.example.Task_Management_System.repositories.ProjectRepository;
import com.example.Task_Management_System.repositories.TaskRepository;
import com.example.Task_Management_System.services.interfaces.TaskService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService {
    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final EmployeeRepository employeeRepository;

    public TaskServiceImpl(TaskRepository taskRepository, ProjectRepository projectRepository, EmployeeRepository employeeRepository) {
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
        this.employeeRepository = employeeRepository;
    }

    @Override
    public List < TaskData > getListOfTasks() {
        List < TaskData > taskDataList = new ArrayList < > ();
        List < Task > tasks = taskRepository.findAll();
        for (Task task: tasks) {
            taskDataList.add(convertToDto(task));
        }
        return taskDataList;
    }

    @Override
    public Task getSpecificRecord(Long taskId) {
        Optional < Task > taskOptional = taskRepository.findById(taskId);
        Task newTask = null;
        if (taskOptional.isPresent()) {
            newTask = taskOptional.get();
        } else {
            throw new IllegalStateException(ErrorMessages.ID_NOT_FOUND_ERROR);
        }
        return newTask;
    }

    @Override
    public List < ? > searchTask(String title) {
        List < ? > task = taskRepository.findByTitleContainingIgnoreCase(title);
        return task;
    }

    @Override
    public void addNewTask(Task task) {
        taskRepository.save(task);
    }

    @Override
    public void updateTaskRecord(Long taskId, Task task) {
        Task newTask = taskRepository.findById(taskId).orElseThrow(() ->
                new IllegalStateException(ErrorMessages.ID_NOT_FOUND_ERROR));
        newTask.setProject(task.getProject());
        newTask.setEmployee(task.getEmployee());
        taskRepository.save(task);
    }

    @Override
    public void deleteTask(Long taskId) {
        Task task = taskRepository.findById(taskId).orElseThrow(() ->
                new IllegalStateException(ErrorMessages.ID_NOT_FOUND_ERROR));
        this.taskRepository.delete(task);
    }

    @Autowired
    private ModelMapper modelMapper;
    private TaskData convertToDto(Task task) {
        TaskData taskDto = modelMapper.map(task, TaskData.class);
        taskDto.setEmployee(task.getEmployee().getFirstName() + ' ' + task.getEmployee().getLastName());
        taskDto.setProject(task.getProject().getName());
        return taskDto;
    }
}