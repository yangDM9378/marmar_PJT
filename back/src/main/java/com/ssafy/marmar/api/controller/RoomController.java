package com.ssafy.marmar.api.controller;

import com.ssafy.marmar.api.response.StudentSearchRes;
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

import java.util.List;

@RestController
@RequestMapping("/api/v1/room")
public class RoomController {

    @Autowired
    RoomService roomService;

    @Autowired
    StudentService studentService;

    @Autowired
    TherapistService therapistService;


    @PutMapping("/makeroom/{studentNum}")
    public ResponseEntity<String> makeRoom(@PathVariable int studentNum, Authentication authentication) throws Exception {
        int therapistNum = getTherapistNum(authentication);
        roomService.RoomTherapist(true, therapistNum);
        roomService.RoomStudent(true, studentNum);
        return ResponseEntity.status(200).body("방이 생성되었습니다.");
    }

    @PutMapping("/endroom/{studentNum}")
    public ResponseEntity<String> outRoomTherapist(@PathVariable int studentNum, Authentication authentication) throws Exception {
        int therapistNum = getTherapistNum(authentication);
        roomService.RoomTherapist(false, therapistNum);
        roomService.RoomStudent(false, studentNum);
        return ResponseEntity.status(200).body("방이 종료되었습니다.");
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

    @GetMapping("/searchStudent/{search}")
    public ResponseEntity<List<StudentSearchRes>> searchStudent(@PathVariable String search, Authentication authentication) throws Exception {

        TherapistDetails userDetails = (TherapistDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        Therapist user = therapistService.getUserByUserId(userId);

        List<StudentSearchRes> list = therapistService.makeRoomStudentSearchList(search, user);

        return ResponseEntity.status(200).body(list);
    }


}
