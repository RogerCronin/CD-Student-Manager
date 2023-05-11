package net.squarebrackets.studentmanagerserver.services;

import net.squarebrackets.studentmanagerserver.models.Student;
import net.squarebrackets.studentmanagerserver.other.ResourceCreationException;
import net.squarebrackets.studentmanagerserver.other.ResourceNotFoundException;

import java.util.List;

public interface StudentService {
    Student create(Student student) throws ResourceCreationException;
    Student getById(String id) throws ResourceNotFoundException;
    Student getByEmail(String email) throws ResourceNotFoundException;
    List<Student> getAll();
    Student update(String id, Student update) throws ResourceNotFoundException;
    void delete(String id) throws ResourceNotFoundException;
}
