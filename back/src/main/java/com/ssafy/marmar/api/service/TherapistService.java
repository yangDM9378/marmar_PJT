package com.ssafy.marmar.api.service;

import com.ssafy.marmar.api.request.TherapistRegisterPostReq;
import com.ssafy.marmar.api.request.UpdatePwdPostReq;
import com.ssafy.marmar.api.response.StudentSearchRes;
import com.ssafy.marmar.db.model.Student;
import com.ssafy.marmar.db.model.Therapist;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TherapistService {

    Therapist getUserByUserId(String userId);
    Therapist getUserByUserEmail(String userEmail);
    Therapist createUser(TherapistRegisterPostReq registInfo);

    List<StudentSearchRes> studentSearchList(String searchKeyword) throws Exception;

    List<StudentSearchRes> studentList(int therapistNum);

    boolean modifyPwd(String userId, UpdatePwdPostReq updatePwdPostReq) throws Exception;

    void modifyName(String userId, String modifyName) throws Exception;

    void modifyPhone(String userId, String modifyPhone) throws Exception;

    void modifyDepartment(String userId, String modifyDepartment) throws Exception;

    void deleteStudent(Therapist therapist) throws Exception;
}
