package com.ssafy.marmar.api.service;

import com.ssafy.marmar.db.model.Therapist;
import com.ssafy.marmar.db.repository.StudentRepository;
import com.ssafy.marmar.db.repository.TherapistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoomServiceImpl implements RoomService {

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    TherapistRepository therapistRepository;


    @Override
    public void RoomStudent(boolean inout, int studentNum) throws Exception {
        studentRepository.updateOngoing(inout, studentNum);
    }

    @Override
    public void RoomTherapist(boolean inout, int therapistNum) throws Exception {
        therapistRepository.updateOngoing(inout, therapistNum);
    }

    @Override
    public void createRoom(String userId) throws Exception {
        Therapist therapist = therapistRepository.findByTherapistId(userId).get();
        int num = therapist.getNum();
        therapistRepository.updateProgramRoom(userId, num);
        therapistRepository.updateClassRoom(userId, num);
    }


}
