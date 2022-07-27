package com.example.Task_Management_System.services.implementations;
import com.example.Task_Management_System.dto.EmployeeData;
import com.example.Task_Management_System.errors.ErrorMessages;
import com.example.Task_Management_System.models.Employee;
import com.example.Task_Management_System.repositories.DepartmentRepository;
import com.example.Task_Management_System.repositories.EmployeeRepository;
import com.example.Task_Management_System.services.interfaces.EmployeeService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    private final DepartmentRepository departmentRepository;
    private final EmployeeRepository employeeRepository;
    public EmployeeServiceImpl(DepartmentRepository departmentRepository,
                               EmployeeRepository employeeRepository) {
        this.departmentRepository = departmentRepository;
        this.employeeRepository = employeeRepository;
    }

    @Override
    public List <EmployeeData> getListOfEmployees() {
        List < EmployeeData > employeeDataList = new ArrayList < > ();
        List < Employee > employees = employeeRepository.findAll();
        for (Employee employee: employees) {
            employeeDataList.add(convertToDto(employee));
        }
        return employeeDataList;
    }

    @Override
    public Employee getSpecificRecord(Long id) {
        Optional < Employee > employeeOptional = employeeRepository.findById(id);
        Employee newEmployee = null;
        if (employeeOptional.isPresent()) {
            newEmployee = employeeOptional.get();
        } else {
            throw new IllegalStateException(ErrorMessages.ID_NOT_FOUND_ERROR);
        }
        return newEmployee;
    }

    @Override
    public void addNewEmployee(Employee employee) {
        employeeRepository.save(employee);
    }

    @Transactional
    @Override
    public void updateEmployeeRecord(Long employeeId, Employee employee) {
        Employee emp = employeeRepository.findById(employeeId).orElseThrow(() ->
                new IllegalStateException(ErrorMessages.ID_NOT_FOUND_ERROR));
        emp.setPosition(employee.getPosition());
        emp.setLastName(employee.getLastName());
        emp.setFirstName(employee.getFirstName());
        emp.setDepartment(employee.getDepartment());
        this.employeeRepository.save(employee);

    }

    @Override
    public void deleteEmployee(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(() ->
                new IllegalStateException(ErrorMessages.ID_NOT_FOUND_ERROR));
        this.employeeRepository.delete(employee);
    }

    @Autowired
    private ModelMapper modelMapper;
    private EmployeeData convertToDto(Employee employee) {
        EmployeeData empDto = modelMapper.map(employee, EmployeeData.class);
        empDto.setDepartment(employee.getDepartment().getName());
        return empDto;
    }

}