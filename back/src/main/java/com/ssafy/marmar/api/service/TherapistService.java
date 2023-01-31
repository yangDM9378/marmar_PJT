package com.ssafy.marmar.api.service;

import com.ssafy.marmar.api.request.TherapistRegisterPostReq;
import com.ssafy.marmar.api.response.StudentSearchRes;
import com.ssafy.marmar.db.model.Student;
import com.ssafy.marmar.db.model.Therapist;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TherapistService {

    Therapist getUserByUserId(String userId);
    Therapist createUser(TherapistRegisterPostReq registInfo);

    List<StudentSearchRes> studentSearchList(String searchKeyword) throws Exception;

    List<StudentSearchRes> studentList(int therapistNum);
}
