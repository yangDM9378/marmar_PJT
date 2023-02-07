package com.ssafy.marmar.api.service;


import com.ssafy.marmar.api.request.EvaluationPostReq;
import com.ssafy.marmar.api.request.StudentRegisterPostReq;
import com.ssafy.marmar.api.request.UpdatePwdPostReq;
import com.ssafy.marmar.api.response.EvaluationRes;
import com.ssafy.marmar.api.response.WordRes;
import com.ssafy.marmar.db.model.Evaluation;
import com.ssafy.marmar.db.model.Student;
import com.ssafy.marmar.db.model.Wordspeaking;
import com.ssafy.marmar.db.repository.EvaluationRepository;
import com.ssafy.marmar.db.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    EvaluationRepository evaluationRepository;

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
        if(student.getStudentPasswordHelper().equals(pwd)) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean modifyPwd(String userId, UpdatePwdPostReq updatePwdPostReq) throws Exception {
        String now = updatePwdPostReq.getNowPassword();
        Student student = studentRepository.findByStudentId(userId).get();
        if(passwordEncoder.matches(now, student.getStudentPassword())){
            String str = passwordEncoder.encode(updatePwdPostReq.getModifyPassword());
            studentRepository.modifyStudentPassword(userId, str);
            return true;
        } else{
            return false;
        }

    }

    @Override
    public void modifyPwdHelper(String userId, String modifyPwdHelper) throws Exception {
        studentRepository.modifyStudentPwdHelper(userId, modifyPwdHelper);
    }

    @Override
    public void modifyName(String userId, String modifyName) throws Exception {
        studentRepository.modifyStudentName(userId, modifyName);
    }

    @Override
    public void modifyNameHelper(String userId, String modifyNameHelper) throws Exception {
        studentRepository.modifyStudentNameHelper(userId, modifyNameHelper);
    }

    @Override
    public void modifyPhone(String userId, String modifyPhone) throws Exception {
        studentRepository.modifyStudentPhone(userId, modifyPhone);
    }

    @Override
    public void modifyBirth(String userId, String modifyBirth) throws Exception {
        studentRepository.modifyStudentBirth(userId, modifyBirth);
    }

    @Override
    public void deleteStudent(Student student) {
        studentRepository.delete(student);
    }

    @Override
    public boolean checkPwd(String pwd, Student student) {
        boolean res = passwordEncoder.matches(pwd, student.getStudentPassword());
        return res;
    }

    @Override
    public boolean insertEvaluation(int studentNum, EvaluationPostReq evaluationPostReq) {
        try{
            Student student = studentRepository.findByNum(studentNum).get();
            Evaluation evaluation = new Evaluation();
            evaluation.setEvalAchieve(evaluationPostReq.getEvalAchieve());
            evaluation.setEvalConcentration(evaluationPostReq.getEvalConcentration());
            evaluation.setEvalEntire(evaluationPostReq.getEvalEntire());
            evaluation.setStudent(student);
            evaluation.setEvalDate(LocalDateTime.now());
            evaluationRepository.save(evaluation);
            return true;
        } catch (Exception e){
            return false;
        }
    }

    @Override
    public List<EvaluationRes> selectList(int studentNum) {

        List<Evaluation> evaluations = evaluationRepository.findAllByStudentNum(studentNum);
        List<EvaluationRes> EvaluationResList = new ArrayList<>();

        for(Evaluation evaluation : evaluations){
            EvaluationRes res = EvaluationRes.builder()
                    .num(evaluation.getNum())
                    .evalAchieve(evaluation.getEvalAchieve())
                    .evalConcentration(evaluation.getEvalConcentration())
                    .evalEntire(evaluation.getEvalEntire())
                    .evalDate(evaluation.getEvalDate())
                    .student(evaluation.getStudent())
                    .build();
            EvaluationResList.add(res);
        }

        return EvaluationResList;
    }
}
