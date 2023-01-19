package com.ssafy.marmar.api.controller;

import com.ssafy.marmar.api.request.StudentRegisterPostRes;
import com.ssafy.marmar.api.service.StudentService;
import com.ssafy.marmar.dto.ResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    @Autowired
    StudentService studentService;

    @PostMapping()
    public ResponseDto<Integer> register(@RequestBody StudentRegisterPostRes registerInfo){
        studentService.createUser(registerInfo);
        return new ResponseDto<Integer>(HttpStatus.OK.value(),1);
    }
}
