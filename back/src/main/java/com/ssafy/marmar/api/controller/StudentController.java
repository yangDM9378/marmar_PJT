package com.ssafy.marmar.api.controller;

import com.ssafy.marmar.api.request.FindPassPostReq;
import com.ssafy.marmar.api.request.StudentRegisterPostReq;
import com.ssafy.marmar.api.response.StudentRes;
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

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/v1/student")
public class StudentController {

    @Autowired
    StudentService studentService;

    @Autowired
    TherapistService therapistService;



    @GetMapping("/{studentId}")
    public ResponseEntity<Boolean> checkStudentId(@PathVariable String studentId) {

        try{
            therapistService.getUserByUserId(studentId);
        }catch(NoSuchElementException e){//아이디 중복되지 않으면 true 리턴
            try{
                studentService.getUserByUserId(studentId);
            } catch(NoSuchElementException e1){//아이디 중복되지 않으면 true 리턴
                return ResponseEntity.status(200).body(true);
            }
        }
        return	ResponseEntity.status(200).body(false);

    }

    @GetMapping("/checkEmail/{studentEmail}")
    public ResponseEntity<Boolean> checkStudentEmail(@PathVariable String studentEmail) {

        try{
            therapistService.getUserByUserEmail(studentEmail);
        }catch(NoSuchElementException e){//아이디 중복되지 않으면 true 리턴
            try{
                studentService.getUserByUserEmail(studentEmail);
            } catch(NoSuchElementException e1){//아이디 중복되지 않으면 true 리턴
                return ResponseEntity.status(200).body(true);
            }
        }
        return	ResponseEntity.status(200).body(false);
    }

    @PostMapping()
    public ResponseDto<Integer> register(@RequestBody StudentRegisterPostReq registerInfo){
        studentService.createUser(registerInfo);
        return new ResponseDto<Integer>(HttpStatus.OK.value(),1);
    }

    @GetMapping("/me")
    public ResponseEntity<StudentRes> getStudentInfo(Authentication authentication) {
        StudentDetails userDetails = (StudentDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        Student user = studentService.getUserByUserId(userId);

        return ResponseEntity.status(200).body(StudentRes.of(user));
    }

    @PutMapping("/selectTherapist/{studentNum}")
    public ResponseEntity<Integer> updateTherapistNum(@PathVariable int studentNum, Authentication authentication) throws Exception {

        int therapistNum = getTherapistNum(authentication);
        studentService.updateTherapistNum(studentNum, therapistNum);

        return ResponseEntity.status(200).body(200);
    }

    @PutMapping("/deleteTherapist/{studentNum}")
    public ResponseEntity<Integer> deleteTherapistNum(@PathVariable int studentNum) throws Exception {

        //int therapistNum = getTherapistNum(authentication);
        studentService.deleteTherapistNum(studentNum);

        return ResponseEntity.status(200).body(200);
    }

    public int getTherapistNum(Authentication authentication){
        TherapistDetails userDetails = (TherapistDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        Therapist user = therapistService.getUserByUserId(userId);
        return user.getNum();
    }

    @PostMapping("/check/PasswordHelper")
    public @ResponseBody Map<String, Boolean> pw_find(@RequestBody String studentPasswordHelper, Authentication authentication){
        Map<String,Boolean> json = new HashMap<>();
        StudentDetails studentDetails = (StudentDetails) authentication.getDetails();
        String userId = studentDetails.getUsername();
        Student student = studentService.getUserByUserId(userId);
        System.out.println(studentPasswordHelper);
        boolean pwFindCheck = studentService.studentHelperPwdCheck(student, studentPasswordHelper);
        json.put("check", pwFindCheck);
        System.out.println(studentPasswordHelper);
        return json;
    }
}
