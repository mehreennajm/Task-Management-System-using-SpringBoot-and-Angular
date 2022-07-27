package com.example.Task_Management_System.repositories;
import com.example.Task_Management_System.models.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;



@Repository
public interface ProjectRepository extends JpaRepository<Project,Long> {
    @Query(value = "SELECT p.projectId,p.department.name , p.name from Project p")
    List<?> findAllProjects();







}
