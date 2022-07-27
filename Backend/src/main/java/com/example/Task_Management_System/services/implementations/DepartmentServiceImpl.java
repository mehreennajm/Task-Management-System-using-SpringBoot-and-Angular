package com.example.Task_Management_System.services.implementations;
import com.example.Task_Management_System.errors.ErrorMessages;
import com.example.Task_Management_System.models.Department;
import com.example.Task_Management_System.repositories.DepartmentRepository;
import com.example.Task_Management_System.services.interfaces.DepartmentService;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;
    public DepartmentServiceImpl(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    @Override
    public List < Department > getListOfDepartments() {

        return departmentRepository.findAll(Sort.by(Sort.Direction.DESC, "departmentId"));
    }

    @Override
    public void addNewDepartment(Department department) {
        departmentRepository.save(department);

    }

    @Override
    public void updateDepartment(Department department, Long departmentId) {

        getListOfDepartments().stream().map(b -> {
            if (b.getDepartmentId() == departmentId) {
                b.setName(department.getName());
            }
            return b;
        }).collect(Collectors.toList());

    }

    @Override
    public void deleteDepartment(Long departmentId) {
        Department department = departmentRepository.findById(departmentId).orElseThrow(() ->
                new IllegalStateException(ErrorMessages.ID_NOT_FOUND_ERROR));
        departmentRepository.delete(department);
    }

    @Override
    public Department getSpecificRecord(Long id) {
        Optional < Department > departmentOptional = departmentRepository.findById(id);
        Department newDepartment = null;
        if (departmentOptional.isPresent()) {
            newDepartment = departmentOptional.get();
        } else {
            throw new IllegalStateException(ErrorMessages.ID_NOT_FOUND_ERROR);
        }
        return newDepartment;
    }
}