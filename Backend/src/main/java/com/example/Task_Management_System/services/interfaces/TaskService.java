package com.example.Task_Management_System.services.interfaces;
import com.example.Task_Management_System.dto.TaskData;
import com.example.Task_Management_System.models.Task;

import java.util.List;

public interface TaskService {
    List<TaskData> getListOfTasks();

    void addNewTask(Task task);

    void updateTaskRecord(Long taskId, Task task);

    void deleteTask(Long taskId);

    Task getSpecificRecord(Long taskId);

    List<?> searchTask(String title);


}
