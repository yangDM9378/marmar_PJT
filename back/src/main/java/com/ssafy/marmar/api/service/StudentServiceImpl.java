package com.ssafy.marmar.api.service;


import com.ssafy.marmar.api.request.StudentRegisterPostRes;
import com.ssafy.marmar.db.model.Student;
import com.ssafy.marmar.db.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    StudentRepository studentRepository;

    @Override
    public Student createUser(StudentRegisterPostRes registerInfo) {
        Student student = new Student();

        student.setStudentNameHelper(registerInfo.getNameHelper());
        student.setStudentName(registerInfo.getName());
        student.setStudentId(registerInfo.getId());
        student.setStudentPassword(registerInfo.getPassword());
        student.setStudentPasswordHelper(registerInfo.getPasswordHelper());
        student.setStudentBirth(registerInfo.getBirth());
        student.setStudentPhoneHelper(registerInfo.getPhoneHelper());
        student.setStudentEmailId(registerInfo.getEmailId());
        student.setStudentEmailDomain(registerInfo.getEmailDomain());
        return studentRepository.save(student);
    }
}
