package com.ssafy.marmar.api.controller;

import com.ssafy.marmar.api.request.StudentRegisterPostReq;
import com.ssafy.marmar.api.service.StudentService;
import com.ssafy.marmar.api.service.TherapistService;
import com.ssafy.marmar.db.model.Student;
import com.ssafy.marmar.db.model.Therapist;
import com.ssafy.marmar.dto.ResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
//            studentService.getUserByUserId(therapistId);
            therapistService.getUserByUserId(studentId);

        }catch(NoSuchElementException e){//아이디 중복되지 않으면 true 리턴
            try{
                studentService.getUserByUserId(studentId);
            } catch(NoSuchElementException e1){//아이디 중복되지 않으면 true 리턴
                return ResponseEntity.status(200).body(true);
            }
            return ResponseEntity.status(200).body(true);
        }

//        try{
//            studentService.getUserByUserId(therapistId);
////            therapistService.getUserByUserId(therapistId);
//        }catch(NoSuchElementException e){//아이디 중복되지 않으면 true 리턴
//            return ResponseEntity.status(200).body(true);
//        }
        //중복되면 false 리턴
        return	ResponseEntity.status(200).body(false);

        //        try{
//            studentService.getUserByUserId(studentId);
////            therapistService.getUserByUserId(studentId);
//        }catch(NoSuchElementException e){//아이디 중복되지 않으면 true 리턴
//            return ResponseEntity.status(200).body(true);
//        }
//
//        try{
////            studentService.getUserByUserId(studentId);
//            therapistService.getUserByUserId(studentId);
//        }catch(NoSuchElementException e){//아이디 중복되지 않으면 true 리턴
//            return ResponseEntity.status(200).body(true);
//        }
        //중복되면 false 리턴

    }

    @PostMapping()
    public ResponseDto<Integer> register(@RequestBody StudentRegisterPostReq registerInfo){
        studentService.createUser(registerInfo);
        return new ResponseDto<Integer>(HttpStatus.OK.value(),1);
    }
}
