package com.example.Task_Management_System.models;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.Cascade;
import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "employees")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Employee {


    public Employee(String firstName, Department department) {
        this.firstName = firstName;
        this.department = department;
    }

    public Employee(String firstName) {
        this.firstName = firstName;
    }

    public Employee(Department department) {
        this.department = department;
    }

    public Employee(Long employeeId, String firstName, String lastName, String position, Department department) {
        this.employeeId = employeeId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.position = position;
        this.department = department;
    }

    public Employee(String firstName, String lastName, String position, Department department) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.position = position;
        this.department = department;
    }

    public Employee(String firstName, String lastName, String position) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.position = position;
    }


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long employeeId;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(nullable = false)
    private String position;


    @ManyToOne
    @Cascade(org.hibernate.annotations.CascadeType.DETACH)
    @JoinColumn(name="department_id")
    private Department department;

    @JsonIgnore
    @OneToMany(mappedBy = "employee",cascade = CascadeType.ALL)
    private List<Task> tasks;
}
