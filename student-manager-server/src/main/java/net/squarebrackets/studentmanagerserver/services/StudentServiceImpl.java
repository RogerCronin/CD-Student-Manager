package net.squarebrackets.studentmanagerserver.services;

import net.squarebrackets.studentmanagerserver.models.Student;
import net.squarebrackets.studentmanagerserver.other.ResourceCreationException;
import net.squarebrackets.studentmanagerserver.other.ResourceNotFoundException;
import net.squarebrackets.studentmanagerserver.repos.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {
    private StudentRepository studentRepository;

    @Autowired
    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public Student create(Student student) throws ResourceCreationException {
        return studentRepository.save(student);
    }

    @Override
    public Student getById(Long id) throws ResourceNotFoundException {
        return studentRepository.findById(id).orElseThrow(
            () -> new ResourceNotFoundException(String.format("No student with ID %d", id))
        );
    }

    @Override
    public Student getByEmail(String email) throws ResourceNotFoundException {
        return studentRepository.findByEmail(email).orElseThrow(
            () -> new ResourceNotFoundException(String.format("No student with email %s", email))
        );
    }

    @Override
    public List<Student> getAll() {
        return studentRepository.findAll();
    }

    @Override
    public Student update(Long id, Student student) throws ResourceNotFoundException {
        Student oldStudent = getById(id);
        oldStudent.setFirstName(student.getFirstName());
        oldStudent.setLastName(student.getLastName());
        oldStudent.setGrade(student.getGrade());
        oldStudent.setAge(student.getAge());
        oldStudent.setEmail(student.getEmail());
        oldStudent.setSchool(student.getSchool());
        return studentRepository.save(oldStudent);
    }

    @Override
    public void delete(Long id) throws ResourceNotFoundException {
        Student student = getById(id);
        studentRepository.delete(student);
    }
}
