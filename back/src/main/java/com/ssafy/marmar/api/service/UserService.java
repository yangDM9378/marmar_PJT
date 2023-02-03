package com.ssafy.marmar.api.service;

import com.ssafy.marmar.db.model.Student;
import com.ssafy.marmar.db.model.Therapist;

public interface UserService {

    Student getStudentByUserId(String userId);
    Therapist getTherapistByUserId(String userId);

    boolean studentEmailCheck(String userEmail, String userId);
    boolean therapistEmailCheck(String userEmail, String userId);
}
