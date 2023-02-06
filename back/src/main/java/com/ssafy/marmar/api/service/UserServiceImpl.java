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

    @Override
    public Student getStudentByUserEmail(String userEmail) {
        Student student = new Student();
        try {
            student = studentRepository.findByStudentEmail(userEmail).get();
        } catch(NoSuchElementException e) {
            System.out.println(e.getMessage());
            student = null;
        }
        return student;
    }

    @Override
    public Therapist getTherapistByUserEmail(String userEmail) {
        Therapist therapist = new Therapist();
        try {
            therapist = therapistRepository.findByTherapistEmail(userEmail).get();
        } catch(NoSuchElementException e) {
            System.out.println(e.getMessage());
            therapist = null;
        }
        return therapist;
    }

    @Override
    public boolean studentIdEmailCheck(String userEmail, String userId) {
        Student student = studentRepository.findByStudentEmail(userEmail).get();
        if(student!=null && student.getStudentId().equals(userId)) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean therapistIdEmailCheck(String userEmail, String userId) {
        Therapist therapist = therapistRepository.findByTherapistEmail(userEmail).get();
        if(therapist!=null && therapist.getTherapistId().equals(userId)){
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean studentIdCheck(String userEmail, String userName) {
        Student student = studentRepository.findByStudentEmail(userEmail).get();
        if(student!=null && student.getStudentName().equals(userName)) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean therapistIdCheck(String userEmail, String userName) {
        Therapist therapist = therapistRepository.findByTherapistEmail(userEmail).get();
        if(therapist!=null && therapist.getTherapistName().equals(userName)){
            return true;
        } else {
            return false;
        }
    }

}
