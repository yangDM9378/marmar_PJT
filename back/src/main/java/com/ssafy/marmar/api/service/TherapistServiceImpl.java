package com.ssafy.marmar.api.service;

import com.ssafy.marmar.api.request.TherapistRegisterPostReq;
import com.ssafy.marmar.db.model.Therapist;
import com.ssafy.marmar.db.repository.TherapistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class TherapistServiceImpl implements TherapistService {

    @Autowired
    TherapistRepository therapistRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public Therapist getUserByUserId(String userId) {
        Therapist therapist = therapistRepository.findByTherapistId(userId).get();
        return therapist;
    }

    @Override
    public Therapist createUser(TherapistRegisterPostReq registInfo) {
        Therapist therapist = new Therapist();

        therapist.setTherapistId(registInfo.getId());
        therapist.setTherapistName(registInfo.getName());
        therapist.setTherapistPhone(registInfo.getPhone());
        therapist.setTherapistEmailId(registInfo.getEmailId());
        therapist.setTherapistEmailDomain(registInfo.getEmailDomain());
        therapist.setTherapistDepartment(registInfo.getDepartment());

        therapist.setTherapistPassword(passwordEncoder.encode(registInfo.getPassword()));

        return therapistRepository.save(therapist);
    }
}
