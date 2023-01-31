package com.ssafy.marmar.api.service;

import com.ssafy.marmar.api.request.TherapistRegisterPostReq;
import com.ssafy.marmar.api.response.StudentSearchRes;
import com.ssafy.marmar.db.model.Student;
import com.ssafy.marmar.db.model.Therapist;
import com.ssafy.marmar.db.model.Wordspeaking;
import com.ssafy.marmar.db.repository.StudentRepository;
import com.ssafy.marmar.db.repository.TherapistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    public Therapist createUser(TherapistRegisterPostReq registInfo) {
        Therapist therapist = new Therapist();

        therapist.setTherapistId(registInfo.getId());
        therapist.setTherapistName(registInfo.getName());
        therapist.setTherapistPhone(registInfo.getPhone());
        therapist.setTherapistEmailId(registInfo.getEmailId());
        therapist.setTherapistEmailDomain(registInfo.getEmailDomain());
        therapist.setTherapistDepartment(registInfo.getDepartment());

        therapist.setTherapistPassword(passwordEncoder.encode(registInfo.getPassword()));

        return therapistRepository.save(therapist);
    }

    @Override
    public List<StudentSearchRes> studentSearchList(String searchKeyword) throws Exception {

        List<Student> students = studentRepository.findByStudentNameContaining(searchKeyword);
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
}
