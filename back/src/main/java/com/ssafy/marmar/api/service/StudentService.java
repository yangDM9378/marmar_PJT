package com.ssafy.marmar.api.service;

import com.ssafy.marmar.api.request.StudentRegisterPostReq;
import com.ssafy.marmar.db.model.Student;

public interface StudentService {

    Student getUserByUserId(String userId);
    Student createUser(StudentRegisterPostReq registInfo);
    void updateTherapistNum(int studentNum, int therapistNum) throws Exception;
}
