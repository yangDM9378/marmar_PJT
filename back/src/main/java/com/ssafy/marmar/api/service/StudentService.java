package com.ssafy.marmar.api.service;

import com.ssafy.marmar.api.request.EvaluationPostReq;
import com.ssafy.marmar.api.request.StudentRegisterPostReq;
import com.ssafy.marmar.api.request.UpdatePwdPostReq;
import com.ssafy.marmar.api.response.EvaluationRes;
import com.ssafy.marmar.db.model.Student;

//import java.sql.Date;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface StudentService {

    Student getUserByUserId(String userId);
    Student getUserByUserEmail(String userEmail);

    Student createUser(StudentRegisterPostReq registInfo);
    void updateTherapistNum(int studentNum, int therapistNum) throws Exception;

    void deleteTherapistNum(int studentNum) throws Exception;
//    void deleteTherapistNum(int studentNum, int therapistNum);


    boolean studentHelperPwdCheck(Student student, String pwd);

    boolean modifyPwd(String userId, UpdatePwdPostReq updatePwdPostReq) throws Exception;
    void modifyPwdHelper(String userId, String modifyPwdHelper) throws Exception;
    void modifyName(String userId, String modifyName) throws Exception;
    void modifyNameHelper(String userId, String modifyNameHelper) throws Exception;
    void modifyPhone(String userId, String modifyPhone) throws Exception;
    void modifyBirth(String userId, String modifyBirth) throws Exception;
    void deleteStudent(Student student);

    boolean checkPwd(String pwd, Student student);

    boolean insertEvaluation(int studentNum, EvaluationPostReq evaluationPostReq);

    List<EvaluationRes> selectList(int studentNum);

    List<EvaluationRes> selectDateList(int studentNum, LocalDate date) throws Exception;
}
