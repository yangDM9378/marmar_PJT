package com.ssafy.marmar.api.service;

import com.ssafy.marmar.db.model.Student;
import com.ssafy.marmar.db.model.Therapist;
import com.ssafy.marmar.db.repository.StudentRepository;
import com.ssafy.marmar.db.repository.TherapistRepository;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    TherapistRepository therapistRepository;

    public UserServiceImpl(StudentRepository studentRepository, TherapistRepository therapistRepository) {
        this.studentRepository = studentRepository;
        this.therapistRepository = therapistRepository;
    }

    @Override
    public Student getStudentByUserId(String userId) {
        Student student = new Student();
        try {
            student = studentRepository.findByStudentId(userId).get();
        } catch(NoSuchElementException e) {
            System.out.println(e.getMessage());
            student = null;
        }
        return student;
    }

    @Override
    public Therapist getTherapistByUserId(String userId) {
        Therapist therapist = new Therapist();
        try {
            therapist = therapistRepository.findByTherapistId(userId).get();
        } catch(NoSuchElementException e) {
            System.out.println(e.getMessage());
            therapist = null;
        }
        return therapist;
    }
}
