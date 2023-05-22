package net.squarebrackets.studentmanagerserver.services;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import net.squarebrackets.studentmanagerserver.models.Student;
import net.squarebrackets.studentmanagerserver.other.ResourceCreationException;
import net.squarebrackets.studentmanagerserver.other.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ExecutionException;
import java.util.stream.Stream;

@Service
public class StudentServiceImpl implements StudentService {
    private final CollectionReference studentDB;

    @Autowired
    public StudentServiceImpl(Firestore firestore) {
        studentDB = firestore.collection("students");
    }

    /**
     * Creates a student in the database.
     *
     * @param student Student object to be persisted
     * @return        input Student but with ID
     *
     * @throws ResourceCreationException when an error occurs; should never happen
     */
    @Override
    public Student create(Student student) throws ResourceCreationException {
        // sometimes a field can be null despite the annotations, make sure to reject it
        if(!Stream.of(
            student.getFirstName(),
            student.getLastName(),
            student.getGrade(),
            student.getAge(),
            student.getEmail(),
            student.getSchool()
        ).allMatch(Objects::nonNull)) throw new ResourceCreationException();
        String id = UUID.randomUUID().toString(); // generate a UUID for Student.id
        DocumentReference ref = studentDB.document(id);
        student.setId(id);
        ApiFuture<WriteResult> res = ref.set(student);
        try {
            res.get();
            return student;
        } catch(InterruptedException | ExecutionException ex) {
            throw new ResourceCreationException();
        }
    }

    /**
     * Gets a student based on their ID.
     *
     * @param id ID of student to find
     * @return   Student matching the database information
     *
     * @throws ResourceNotFoundException when a student with that ID cannot be found
     */
    @Override
    public Student getById(String id) throws ResourceNotFoundException {
        DocumentReference ref = studentDB.document(id);
        try {
            DocumentSnapshot document = ref.get().get();
            if(!document.exists()) throw new ResourceNotFoundException();
            return document.toObject(Student.class);
        } catch(InterruptedException | ExecutionException ex) {
            throw new ResourceNotFoundException();
        }
    }

    /**
     * Same as getById, but matches email instead. Matches first student with email match.
     * Note this is unused in the current product.
     *
     * @param email email of student to find
     * @return      Student matching the database information
     *
     * @throws ResourceNotFoundException when a student with that email cannot be found
     */
    @Override
    public Student getByEmail(String email) throws ResourceNotFoundException {
        Query ref = studentDB.whereEqualTo("email", email);
        try {
            return ref.get().get().getDocuments().get(0).toObject(Student.class);
        } catch(InterruptedException | ExecutionException | IndexOutOfBoundsException ex) {
            throw new ResourceNotFoundException();
        }
    }

    /**
     * Returns a list of all students in the database.
     *
     * @return list of all students
     */
    @Override
    public List<Student> getAll() {
        try {
            return studentDB.get().get().getDocuments().stream().map(
                (document) -> document.toObject(Student.class)
            ).toList();
        } catch(InterruptedException | ExecutionException ex) {
            return new ArrayList<>();
        }
    }

    /**
     * Updates a student's database entry.
     *
     * @param id     ID of student to update
     * @param update Student object with values that should be changed
     * @return       student with changes now persisted in the database
     *
     * @throws ResourceNotFoundException when a student with that ID cannot be found
     */
    @Override
    public Student update(String id, Student update) throws ResourceNotFoundException {
        DocumentReference ref = studentDB.document(id);
        ArrayList<ApiFuture<WriteResult>> futures = new ArrayList<>();
        // manually set all changes
        futures.add(ref.update("firstName", update.getFirstName()));
        futures.add(ref.update("lastName", update.getLastName()));
        futures.add(ref.update("grade", update.getGrade()));
        futures.add(ref.update("age", update.getAge()));
        futures.add(ref.update("email", update.getEmail()));
        futures.add(ref.update("school", update.getSchool()));
        try {
            for(ApiFuture<WriteResult> res : futures) {
                res.get();
            }
            return ref.get().get().toObject(Student.class);
        } catch(InterruptedException | ExecutionException ex) {
            throw new ResourceNotFoundException();
        }
    }

    /**
     * Deletes a student from the database.
     *
     * @param id ID of student to be deleted
     *
     * @throws ResourceNotFoundException when a student with that ID cannot be found
     */
    @Override
    public void delete(String id) throws ResourceNotFoundException {
        DocumentReference ref = studentDB.document(id);
        ApiFuture<WriteResult> res = ref.delete();
        try {
            res.get();
        } catch(InterruptedException | ExecutionException ex) {
            throw new ResourceNotFoundException();
        }
    }
}
