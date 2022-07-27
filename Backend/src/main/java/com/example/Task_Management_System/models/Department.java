package com.example.Task_Management_System.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import javax.persistence.*;
import java.beans.ConstructorProperties;
import java.util.Set;


@Entity
@Table(name = "departments")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Department {

    public Department(String name) {
        this.name = name;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long departmentId;

    @Column(nullable = false,unique = true)
    private String name;


    @JsonIgnore
    @OneToMany(mappedBy = "department",cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Employee> employees;

    @JsonIgnore
    @OneToMany(mappedBy = "department",cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Project> projects;

}
