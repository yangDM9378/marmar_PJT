package com.ssafy.marmar.api.service;

public interface RoomService {

    void RoomStudent(boolean inout, int studentNum) throws Exception;
    void RoomTherapist(boolean inout, int therapistNum) throws Exception;
    void createRoom(String userId) throws Exception;
}
