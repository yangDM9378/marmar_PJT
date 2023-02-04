package com.ssafy.marmar.api.controller;

import com.ssafy.marmar.api.request.MakeRoomPostReq;
import com.ssafy.marmar.api.request.TherapistRegisterPostReq;
import com.ssafy.marmar.api.response.StudentRes;
import com.ssafy.marmar.api.service.RoomService;
import com.ssafy.marmar.api.service.StudentService;
import com.ssafy.marmar.api.service.TherapistService;
import com.ssafy.marmar.common.auth.StudentDetails;
import com.ssafy.marmar.common.auth.TherapistDetails;
import com.ssafy.marmar.db.model.Student;
import com.ssafy.marmar.db.model.Therapist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/room")
public class RoomController {

    @Autowired
    RoomService roomService;

    @Autowired
    StudentService studentService;

    @Autowired
    TherapistService therapistService;



    @PutMapping("/makeroom")
    public ResponseEntity<Integer> makeRoom(@RequestBody MakeRoomPostReq makeroomInfo, Authentication authentication) throws Exception {
        int studentNum = makeroomInfo.getStudentNum();
        int wordQuestionCnt = makeroomInfo.getWordQuestionCnt();

        boolean inout = true;
        int therapistNum = getTherapistNum(authentication);
        String therapistName = getTherapistName(authentication);

        roomService.RoomTherapist(inout, therapistNum);
        roomService.RoomStudent(inout, studentNum);
        roomService.ProgramRoom(inout, wordQuestionCnt, therapistName);

        return ResponseEntity.status(200).body(200);
    }

    @PutMapping("/endroom/{studentNum}")
    public ResponseEntity<Integer> outRoomTherapist(@PathVariable int studentNum, Authentication authentication) throws Exception {
        boolean inout = false;
        int therapistNum = getTherapistNum(authentication);
        String therapistName = getTherapistName(authentication);

        roomService.RoomTherapist(inout, therapistNum);
        roomService.RoomStudent(inout, studentNum);
        roomService.ProgramRoom(inout, 0, therapistName);

        return ResponseEntity.status(200).body(200);
    }

    @GetMapping("/enter/student")
    public ResponseEntity<String> studentEnterRoom(Authentication authentication) {
        StudentDetails userDetails = (StudentDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        Student user = studentService.getUserByUserId(userId);
        Therapist therapist = user.getTherapist();
        String therapistId = therapist.getTherapistId();
        return ResponseEntity.status(200).body(therapistId);
    }
    
    public int getTherapistNum(Authentication authentication){
        TherapistDetails userDetails = (TherapistDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        Therapist user = therapistService.getUserByUserId(userId);
        return user.getNum();
    }

    public String getTherapistName(Authentication authentication){
        TherapistDetails userDetails = (TherapistDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        return userId;
    }



}
