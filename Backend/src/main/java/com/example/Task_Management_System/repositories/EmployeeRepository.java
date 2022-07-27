package com.example.Task_Management_System.repositories;
import com.example.Task_Management_System.models.Department;
import com.example.Task_Management_System.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee,Long> {
    @Query(value = "SELECT e.employeeId,e.firstName,e.lastName,e.position,e.department.name from Employee e")
    List<?> listAllEmployees();

    Optional<Employee> findEmployeeByFirstName (String name);
}
