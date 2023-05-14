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

    @Override
    public Student create(Student student) throws ResourceCreationException {
        if(!Stream.of(
            student.getFirstName(),
            student.getLastName(),
            student.getGrade(),
            student.getAge(),
            student.getEmail(),
            student.getSchool()
        ).allMatch(Objects::nonNull)) throw new ResourceCreationException();
        String id = UUID.randomUUID().toString();
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

    @Override
    public Student getByEmail(String email) throws ResourceNotFoundException {
        Query ref = studentDB.whereEqualTo("email", email);
        try {
            return ref.get().get().getDocuments().get(0).toObject(Student.class);
        } catch(InterruptedException | ExecutionException | IndexOutOfBoundsException ex) {
            throw new ResourceNotFoundException();
        }
    }

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

    @Override
    public Student update(String id, Student update) throws ResourceNotFoundException {
        DocumentReference ref = studentDB.document(id);
        ArrayList<ApiFuture<WriteResult>> futures = new ArrayList<>();
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
