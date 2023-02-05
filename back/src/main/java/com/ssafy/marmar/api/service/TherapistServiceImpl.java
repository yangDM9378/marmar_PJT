package com.ssafy.marmar.api.service;

import com.ssafy.marmar.api.request.TherapistRegisterPostReq;
import com.ssafy.marmar.api.response.StudentSearchRes;
import com.ssafy.marmar.db.model.Student;
import com.ssafy.marmar.db.model.Therapist;
import com.ssafy.marmar.db.repository.StudentRepository;
import com.ssafy.marmar.db.repository.TherapistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TherapistServiceImpl implements TherapistService {

    @Autowired
    TherapistRepository therapistRepository;

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public Therapist getUserByUserId(String userId) {
        Therapist therapist = therapistRepository.findByTherapistId(userId).get();
        return therapist;
    }

    @Override
    public Therapist getUserByUserEmail(String userEmail) {
        Therapist therapist = therapistRepository.findByTherapistEmail(userEmail).get();
        return therapist;
    }

    @Override
    public Therapist createUser(TherapistRegisterPostReq registInfo) {
        Therapist therapist = new Therapist();

        therapist.setTherapistId(registInfo.getId());
        therapist.setTherapistName(registInfo.getName());
        therapist.setTherapistPhone(registInfo.getPhone());
        therapist.setTherapistEmail(registInfo.getEmail());
        therapist.setTherapistDepartment(registInfo.getDepartment());

        therapist.setTherapistPassword(passwordEncoder.encode(registInfo.getPassword()));

        return therapistRepository.save(therapist);
    }

    @Override
    public List<StudentSearchRes> studentSearchList(String searchKeyword) throws Exception {

        List<Student> students = studentRepository.findstudent(searchKeyword);
        List<StudentSearchRes> studentList = new ArrayList<>();

        for(Student student : students){
            StudentSearchRes res = StudentSearchRes.builder()
                    .num(student.getNum())
                    .studentName(student.getStudentName())
                    .studentId(student.getStudentId())
                    .build();
            studentList.add(res);
        }

        return studentList;

    }

    @Override
    public List<StudentSearchRes> studentList(int therapistNum) {
        List<Student> students = studentRepository.findByTherapistNum(therapistNum);
        List<StudentSearchRes> studentList = new ArrayList<>();

        for(Student student : students){
            StudentSearchRes res = StudentSearchRes.builder()
                    .num(student.getNum())
                    .studentName(student.getStudentName())
                    .studentId(student.getStudentId())
                    .build();
            studentList.add(res);
        }

        return studentList;
    }

    @Override
    public void modifyPwd(String userId, String modifyPwd) throws Exception {
        String str = passwordEncoder.encode(modifyPwd);
        therapistRepository.modifyTherapistPassword(userId, str);
    }

    @Override
    public void modifyName(String userId, String modifyName) throws Exception {
        therapistRepository.modifyTherapistName(userId, modifyName);
    }

    @Override
    public void modifyPhone(String userId, String modifyPhone) throws Exception {
        therapistRepository.modifyTherapistPhone(userId, modifyPhone);
    }

    @Override
    public void modifyDepartment(String userId, String modifyDepartment) throws Exception {
        therapistRepository.modifyTherapistDepartment(userId, modifyDepartment);
    }
}
