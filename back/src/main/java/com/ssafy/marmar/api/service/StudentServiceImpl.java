package com.ssafy.marmar.api.service;


import com.ssafy.marmar.api.request.StudentRegisterPostReq;
import com.ssafy.marmar.db.model.Student;
import com.ssafy.marmar.db.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public Student getUserByUserId(String userId) {
        Student student = studentRepository.findByStudentId(userId).get();
        return student;
    }

    @Override
    public Student getUserByUserEmail(String userEmail) {
        Student student = studentRepository.findByStudentEmail(userEmail).get();
        return student;
    }

    @Override
    public Student createUser(StudentRegisterPostReq registerInfo) {
        Student student = new Student();

        student.setStudentNameHelper(registerInfo.getNameHelper());
        student.setStudentName(registerInfo.getName());
        student.setStudentId(registerInfo.getId());
        student.setStudentPasswordHelper(registerInfo.getPasswordHelper());
        student.setStudentBirth(registerInfo.getBirth());
        student.setStudentPhoneHelper(registerInfo.getPhoneHelper());
        student.setStudentEmail(registerInfo.getEmail());

        student.setStudentPassword(passwordEncoder.encode(registerInfo.getPassword()));

        return studentRepository.save(student);
    }

    @Override
    public void updateTherapistNum(int studentNum, int therapistNum) throws Exception {
        studentRepository.updateTherapist(studentNum, therapistNum);
    }

    @Override
    public void deleteTherapistNum(int studentNum) throws Exception {
        studentRepository.deleteTherapist(studentNum);
    }

    @Override
    public boolean studentHelperPwdCheck(Student student, String pwd) {
        System.out.println("#####");
        System.out.println(student.getStudentPasswordHelper()+" "+pwd);
        if(student.getStudentPasswordHelper().equals(pwd)) {
            return true;
        } else {
            return false;
        }
    }
}
