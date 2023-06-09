package com.ssafy.marmar.api.controller;

import com.ssafy.marmar.api.request.TherapistRegisterPostReq;
import com.ssafy.marmar.api.request.UpdatePwdPostReq;
import com.ssafy.marmar.api.response.StudentSearchRes;
import com.ssafy.marmar.api.response.TherapistRes;
import com.ssafy.marmar.api.service.RoomService;
import com.ssafy.marmar.api.service.StudentService;
import com.ssafy.marmar.api.service.TherapistService;
import com.ssafy.marmar.common.auth.StudentDetails;
import com.ssafy.marmar.common.auth.TherapistDetails;
import com.ssafy.marmar.db.model.Student;
import com.ssafy.marmar.db.model.Therapist;
import com.ssafy.marmar.dto.ResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/v1/therapist")
public class TherapistController {

    @Autowired
    StudentService studentService;

    @Autowired
    TherapistService therapistService;

    @Autowired
    RoomService roomService;

    @GetMapping("/{therapistId}")
    public ResponseEntity<Boolean> checkTherapistId(@PathVariable String therapistId) {

        try{
            therapistService.getUserByUserId(therapistId);
        }catch(NoSuchElementException e){
            try{
                studentService.getUserByUserId(therapistId);
            } catch(NoSuchElementException e1){
                return ResponseEntity.status(200).body(true);
            }
        }
        return	ResponseEntity.status(200).body(false);
    }

    @GetMapping("/checkEmail/{therapistEmail}")
    public ResponseEntity<Boolean> checkTherapistEmail(@PathVariable String therapistEmail) {

        try{
            therapistService.getUserByUserEmail(therapistEmail);
        }catch(NoSuchElementException e){
            try{
                studentService.getUserByUserEmail(therapistEmail);
            } catch(NoSuchElementException e1){
                return ResponseEntity.status(200).body(true);
            }
        }
        return	ResponseEntity.status(200).body(false);
    }

    @PostMapping()
    public ResponseDto<Integer> register(@RequestBody TherapistRegisterPostReq registerInfo) throws Exception {
        therapistService.createUser(registerInfo);
        String userId = registerInfo.getId();
        roomService.createRoom(userId);
        return new ResponseDto<Integer>(HttpStatus.OK.value(),1);
    }

    @GetMapping("/me")
    public ResponseEntity<TherapistRes> getStudentInfo(Authentication authentication) {

        TherapistDetails userDetails = (TherapistDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        Therapist user = therapistService.getUserByUserId(userId);

        return ResponseEntity.status(200).body(TherapistRes.of(user));
    }

    @GetMapping("/searchStudent/{search}")
    public ResponseEntity<List<StudentSearchRes>> searchStudent(@PathVariable String search) throws Exception {
        List<StudentSearchRes> list = therapistService.studentSearchList(search);
        return ResponseEntity.status(200).body(list);
    }

    @GetMapping("/mypage/studentList")
    public ResponseEntity<List<StudentSearchRes>> studentList(Authentication authentication){

        TherapistDetails userDetails = (TherapistDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        Therapist user = therapistService.getUserByUserId(userId);
        int therapistNum = user.getNum();

        List<StudentSearchRes> list = therapistService.studentList(therapistNum);
        return ResponseEntity.status(200).body(list);
    }

    @PutMapping("/modify/Password")
    public ResponseEntity<Boolean> modifyPassword(@RequestBody UpdatePwdPostReq updatePwdPostReq, Authentication authentication) throws Exception {
        TherapistDetails userDetails = (TherapistDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        boolean res = therapistService.modifyPwd(userId, updatePwdPostReq);
        return ResponseEntity.status(200).body(res);
    }

    @PutMapping("/modify/name")
    public ResponseEntity<String> modifyName(@RequestBody Map<String, String> name, Authentication authentication) throws Exception {
        TherapistDetails userDetails = (TherapistDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        String modifyname = name.get("name");
        therapistService.modifyName(userId, modifyname);
        return ResponseEntity.status(200).body("이름 수정 성공");
    }

    @PutMapping("/modify/phone")
    public ResponseEntity<String> modifyPhone(@RequestBody Map<String, String> phone, Authentication authentication) throws Exception {
        TherapistDetails userDetails = (TherapistDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        String modifyphone = phone.get("phone");
        therapistService.modifyPhone(userId, modifyphone);
        return ResponseEntity.status(200).body("전화번호 수정 성공");
    }

    @PutMapping("/modify/department")
    public ResponseEntity<String> modifyDepartment(@RequestBody Map<String, String> department, Authentication authentication) throws Exception {
        TherapistDetails userDetails = (TherapistDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        String modifydepartment = department.get("department");
        therapistService.modifyDepartment(userId, modifydepartment);
        return ResponseEntity.status(200).body("소속 수정 성공");
    }

    @DeleteMapping("/delete/{password}")
    public ResponseEntity<String> deleteTherapist(@PathVariable String password, Authentication authentication) throws Exception {
        TherapistDetails userDetails = (TherapistDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        Therapist therapist = therapistService.getUserByUserId(userId);
        boolean res = therapistService.checkPwd(password, therapist);
        if(res == true){
            therapistService.deleteStudent(therapist);
            return ResponseEntity.status(200).body("탈퇴처리가 되었습니다. 그동안 이용해주셔서 감사합니다.");
        } else{
            return ResponseEntity.status(403).body("비밀번호를 다시 입력해주세요.");
        }
    }

}
