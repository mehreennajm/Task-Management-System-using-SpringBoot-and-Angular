package com.example.Task_Management_System.repositories;

import com.example.Task_Management_System.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task,Long> {
    Optional<Task> findTaskByTitle (String title);
    @Query(value = "SELECT t.taskId,t.title,t.description,t.createDate,t.dueDate, t.status ," +
            "t.project.name ," +
            " CONCAT(t.employee.firstName , ' ' , t.employee.lastName)" +
            " AS FullName from Task t")
    List<?> findAllTasks();


    @Query(value = "SELECT t.taskId,t.title,t.description,t.createDate,t.dueDate, t.status ," +
            "t.project.name ," +
            " CONCAT(t.employee.firstName , ' ' , t.employee.lastName)" +
            " AS FullName from Task t where t.title like %:title%")
    List<?> findByTitleContainingIgnoreCase(@Param(value = "title") String title);

    @Query(value = "select t.status from Task t")
    List<?> getTaskField();
}
