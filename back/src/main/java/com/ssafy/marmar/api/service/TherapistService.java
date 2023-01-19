package com.ssafy.marmar.api.service;

import com.ssafy.marmar.api.request.TherapistRegisterPostRes;
import com.ssafy.marmar.db.model.Therapist;

public interface TherapistService {

    Therapist createUser(TherapistRegisterPostRes registInfo);
}
