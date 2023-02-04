package com.ssafy.marmar.api.service;

import com.ssafy.marmar.api.request.StudentRegisterPostReq;
import com.ssafy.marmar.db.model.Student;

public interface StudentService {

    Student getUserByUserId(String userId);
    Student getUserByUserEmail(String userEmail);

    Student createUser(StudentRegisterPostReq registInfo);
    void updateTherapistNum(int studentNum, int therapistNum) throws Exception;

    void deleteTherapistNum(int studentNum) throws Exception;
//    void deleteTherapistNum(int studentNum, int therapistNum);


    boolean studentHelperPwdCheck(Student student, String pwd);

    void modifyPwd(String userId, String modifyPwd) throws Exception;
    void modifyPwdHelper(String userId, String modifypwdhelper) throws Exception;
    void modifyName(String userId, String modifyname) throws Exception;
    void modifyNameHelper(String userId, String modifynamehelper) throws Exception;
    void modifyPhone(String userId, String modifyphone) throws Exception;
    void modifyBirth(String userId, String modifybirth) throws Exception;
}
