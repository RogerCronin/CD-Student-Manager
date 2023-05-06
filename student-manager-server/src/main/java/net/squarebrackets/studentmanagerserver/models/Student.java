package net.squarebrackets.studentmanagerserver.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Entity
@NoArgsConstructor(force = true)
@Data
@RequiredArgsConstructor
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    private String firstName;
    @NonNull
    private String lastName;
    @NonNull
    private int grade;
    @NonNull
    private int age;
    @NonNull
    private String email;
    @NonNull
    private String school;

    @Override
    public String toString() {
        return String.format(
            "Student{id=%d, firstName=%s, lastName=%s, grade=%d, age=%d, email=%s, school=%s}",
            id,
            firstName,
            lastName,
            grade,
            age,
            email,
            school
        );
    }
}
