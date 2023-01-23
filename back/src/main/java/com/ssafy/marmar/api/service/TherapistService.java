package com.ssafy.marmar.api.service;

import com.ssafy.marmar.api.request.TherapistRegisterPostReq;
import com.ssafy.marmar.db.model.Student;
import com.ssafy.marmar.db.model.Therapist;

public interface TherapistService {

    Therapist getUserByUserId(String userId);
    Therapist createUser(TherapistRegisterPostReq registInfo);
}
