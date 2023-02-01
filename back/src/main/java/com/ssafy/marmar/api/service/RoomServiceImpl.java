package com.ssafy.marmar.api.service;

import com.ssafy.marmar.db.model.Programroom;
import com.ssafy.marmar.db.model.Therapist;
import com.ssafy.marmar.db.repository.ProgramroomRepository;
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

    @Autowired
    ProgramroomRepository programRoomRepository;

    @Override
    public void RoomStudent(boolean inout, int studentNum) throws Exception {
        studentRepository.updateOngoing(inout, studentNum);
    }

    @Override
    public void RoomTherapist(boolean inout, int therapistNum) throws Exception {
        therapistRepository.updateOngoing(inout, therapistNum);
    }

    @Override
    public void ProgramRoom(boolean go, int wordQuestionCnt, int therapistNum) throws Exception {
        programRoomRepository.updateStatus(go, wordQuestionCnt, therapistNum);
    }

    @Override
    public void createRoom(String userId) throws Exception {
        // userId를 통해서 선생님의 num을 받아오기,
        // 선생님의 num을 이름으로 갖는 프로그램방과 클래스방 생성
        // 선생님 외래키 연결
        // programRoomRepository.create(go, wordQuestionCnt, therapistNum);
        Therapist therapist = therapistRepository.findByTherapistId(userId).get();
        int num = therapist.getNum();
        Programroom programRoom = new Programroom();
        programRoom.setNum(num);
        programRoomRepository.save(programRoom);
        therapistRepository.updateProgramRoom(num, num);
        therapistRepository.updateClassRoom(num, num);


    }


}
