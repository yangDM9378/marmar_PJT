package com.ssafy.marmar.api.service;

public interface RoomService {

    void RoomStudent(boolean inout, int studentNum) throws Exception;
    void RoomTherapist(boolean inout, int therapistNum) throws Exception;

    void ProgramRoom(boolean inout, int wordQuestionCnt, String therapistName) throws Exception;

    void createRoom(String userId) throws Exception;
}
