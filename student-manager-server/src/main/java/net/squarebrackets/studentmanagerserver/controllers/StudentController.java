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

@RestController
@RequestMapping("/api/v1/students")
public class StudentController {
    private final StudentService studentService;
    private final AuthenticationService authenticationService;

    @Autowired
    public StudentController(StudentService studentService, AuthenticationService authenticationService) {
        this.studentService = studentService;
        this.authenticationService = authenticationService;
    }

    /**
     * Gets all students from the database.
     * (ex: GET /api/v1/students/ with token={token})
     *
     * @param token provided user token in header
     * @return      list of all Students from database
     */
    @GetMapping
    public ResponseEntity<List<Student>> getAll(
        @RequestHeader("token") String token
    ) {
        if(!authenticationService.tokenHasAdminPrivileges(token)) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
        List<Student> students = studentService.getAll();
        return new ResponseEntity<>(students, HttpStatus.OK);
    }

    /**
     * Creates a student in the database.
     * (ex: POST /api/v1/students/ with token={token} and body matching Student)
     *
     * @param token   provided user token in header
     * @param student student object that will be created in request body
     * @return        the newly created student with an ID
     */
    @PostMapping
    public ResponseEntity<Student> create(
        @RequestHeader("token") String token,
        @RequestBody Student student
    ) {
        if(!authenticationService.tokenHasAdminPrivileges(token)) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
        student = studentService.create(student);
        return new ResponseEntity<>(student, HttpStatus.CREATED);
    }

    /**
     * Gets a single student from the database.
     * (ex: GET /api/v1/students/{id} with token={token})
     *
     * @param token provided user token in header
     * @param id    ID of student to get
     * @return      student with matching ID
     */
    @GetMapping("{id}")
    public ResponseEntity<Student> getById(
        @RequestHeader("token") String token,
        @PathVariable("id") String id
    ) {
        if(!authenticationService.tokenHasAdminPrivileges(token)) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
        Student student = studentService.getById(id);
        return new ResponseEntity<>(student, HttpStatus.OK);
    }

    /**
     * Changes a single student from the database.
     * (ex: PUT /api/v1/students/{id} with token={token} and body matching Student)
     *
     * @param token   provided user token in header
     * @param id      ID of student to update
     * @param student changes to be persisted
     * @return        updated student object from the database
     */
    @PutMapping("{id}")
    public ResponseEntity<Student> update(
        @RequestHeader("token") String token,
        @PathVariable("id") String id,
        @RequestBody Student student
    ) {
        if(!authenticationService.tokenHasAdminPrivileges(token)) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
        student = studentService.update(id, student);
        return new ResponseEntity<>(student, HttpStatus.ACCEPTED);
    }

    /**
     * Deletes a single student from the database.
     * (ex: DEL /api/v1/students/{id} with token={token})
     *
     * @param token provided user token in header
     * @param id    ID of student to delete
     * @return      empty response with corresponding HttpStatus
     */
    @DeleteMapping("{id}")
    public ResponseEntity<SuccessResponse> delete(
        @RequestHeader("token") String token,
        @PathVariable("id") String id
    ) {
        if(!authenticationService.tokenHasAdminPrivileges(token)) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
        try {
            studentService.delete(id);
            return new ResponseEntity<>(new SuccessResponse(true), HttpStatus.OK);
        } catch(ResourceNotFoundException ex) {
            return new ResponseEntity<>(new SuccessResponse(false, ex.getMessage()), HttpStatus.NOT_FOUND);
        }
    }
}
