package net.squarebrackets.studentmanagerserver.controllers;

import net.squarebrackets.studentmanagerserver.models.Student;
import net.squarebrackets.studentmanagerserver.models.SuccessResponse;
import net.squarebrackets.studentmanagerserver.other.ResourceNotFoundException;
import net.squarebrackets.studentmanagerserver.services.AuthenticationService;
import net.squarebrackets.studentmanagerserver.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@RestController
@RequestMapping("/api/test/students")
public class TestStudentController {
    private final StudentService studentService;
    private final AuthenticationService authenticationService;

    @Autowired
    public TestStudentController(StudentService studentService, AuthenticationService authenticationService) {
        this.studentService = studentService;
        this.authenticationService = authenticationService;
    }

    @GetMapping
    public ResponseEntity<List<Student>> getAll(
        @RequestHeader("token") String token
    ) {
        List<Student> students = studentService.getAll();
        return new ResponseEntity<>(students, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Student> create(
        @RequestHeader("token") String token,
        @RequestBody Student student
    ) {
        student = studentService.create(student);
        return new ResponseEntity<>(student, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<Student> getById(
        @RequestHeader("token") String token,
        @PathVariable("id") String id
    ) {
        Student student = studentService.getById(id);
        return new ResponseEntity<>(student, HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<Student> update(
        @RequestHeader("token") String token,
        @PathVariable("id") String id,
        @RequestBody Student student
    ) {
        student = studentService.update(id, student);
        return new ResponseEntity<>(student, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<SuccessResponse> delete(
        @RequestHeader("token") String token,
        @PathVariable("id") String id
    ) {
        try {
            studentService.delete(id);
            return new ResponseEntity<>(new SuccessResponse(true), HttpStatus.OK);
        } catch(ResourceNotFoundException ex) {
            return new ResponseEntity<>(new SuccessResponse(false, ex.getMessage()), HttpStatus.NOT_FOUND);
        }
    }
}
