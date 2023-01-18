package com.ssafy.marmar.api.service;

import com.ssafy.marmar.api.request.RegisterPostRes;
import com.ssafy.marmar.db.model.Student;
import com.ssafy.marmar.db.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    StudentRepository studentRepository;

    @Override
    public Student createUser(RegisterPostRes registerInfo) {
        Student student = new Student();

        student.setUserNameHelper(registerInfo.getNameHelper());
        student.setUserName(registerInfo.getName());
        student.setUserId(registerInfo.getId());
        student.setUserPassword(registerInfo.getPassword());
        student.setUserPasswordHelper(registerInfo.getPasswordHelper());
        student.setUserBirth(registerInfo.getBirth());
        student.setUserPhoneHelper(registerInfo.getPhoneHelper());
        student.setUserEmailId(registerInfo.getEmailId());
        student.setUserEmailDomain(registerInfo.getEmailDomain());
        return studentRepository.save(student);
    }
}
