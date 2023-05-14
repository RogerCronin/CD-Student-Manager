package net.squarebrackets.studentmanagerserver.models;

import lombok.*;

import java.util.Objects;
import java.util.stream.Stream;

@Getter
@Setter
@NoArgsConstructor(force = true)
@RequiredArgsConstructor
@AllArgsConstructor
public class Student {
    private String id;
    @NonNull
    private String firstName;
    @NonNull
    private String lastName;
    @NonNull
    private Integer grade;
    @NonNull
    private Integer age;
    @NonNull
    private String email;
    @NonNull
    private String school;

    @Override
    public String toString() {
        return String.format(
            "Student{id=%s, firstName=%s, lastName=%s, grade=%d, age=%s, email=%s, school=%s}",
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