package com.ssafy.marmar.api.service;

import com.ssafy.marmar.api.request.TherapistRegisterPostRes;
import com.ssafy.marmar.db.model.Therapist;
import com.ssafy.marmar.db.repository.TherapistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TherapistServiceImpl implements TherapistService {

    @Autowired
    TherapistRepository therapistRepository;

    @Override
    public Therapist createUser(TherapistRegisterPostRes registInfo) {
        Therapist therapist = new Therapist();

        therapist.setTherapistId(registInfo.getId());
        therapist.setTherapistPassword(registInfo.getPassword());
        therapist.setTherapistName(registInfo.getName());
        therapist.setTherapistPhone(registInfo.getPhone());
        therapist.setTherapistEmailId(registInfo.getEmailId());
        therapist.setTherapistEmailDomain(registInfo.getEmailDomain());
        therapist.setTherapistDepartment(registInfo.getDepartment());

        return therapistRepository.save(therapist);
    }
}
