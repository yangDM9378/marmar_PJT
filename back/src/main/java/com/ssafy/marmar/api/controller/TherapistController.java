package com.ssafy.marmar.api.controller;

import com.ssafy.marmar.api.request.TherapistRegisterPostReq;
import com.ssafy.marmar.api.service.StudentService;
import com.ssafy.marmar.api.service.TherapistService;
import com.ssafy.marmar.dto.ResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/v1/therapist")
public class TherapistController {

    @Autowired
    StudentService studentService;

    @Autowired
    TherapistService therapistService;

    @GetMapping("/{therapistId}")
    public ResponseEntity<Boolean> checkTherapistId(@PathVariable String therapistId) {
//        System.out.println(studentService.getUserByUserId(therapistId));
//        if(studentService.getUserByUserId(therapistId)==null && therapistService.getUserByUserId(therapistId)==null){
//            return ResponseEntity.status(200).body(true);
//        } else {
//            return	ResponseEntity.status(200).body(false);
//        }
        try{
//            studentService.getUserByUserId(therapistId);
            therapistService.getUserByUserId(therapistId);

        }catch(NoSuchElementException e){//아이디 중복되지 않으면 true 리턴
            try{
                studentService.getUserByUserId(therapistId);
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
    }

    @PostMapping()
    public ResponseDto<Integer> register(@RequestBody TherapistRegisterPostReq registerInfo){
        therapistService.createUser(registerInfo);
        return new ResponseDto<Integer>(HttpStatus.OK.value(),1);
    }

}
