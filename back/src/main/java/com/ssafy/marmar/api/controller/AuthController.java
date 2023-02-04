package com.ssafy.marmar.api.controller;

import com.ssafy.marmar.api.request.FindIdPostReq;
import com.ssafy.marmar.api.request.FindPassPostReq;
import com.ssafy.marmar.api.request.UserLoginPostReq;
import com.ssafy.marmar.api.response.UserLoginPostRes;
import com.ssafy.marmar.api.service.SendEmailService;
import com.ssafy.marmar.api.service.UserService;
import com.ssafy.marmar.common.util.JwtTokenUtil;
import com.ssafy.marmar.db.model.Student;
import com.ssafy.marmar.db.model.Therapist;
import com.ssafy.marmar.dto.MailDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    UserService userService;

    @Autowired
    SendEmailService sendEmailService;

    @Autowired
    PasswordEncoder passwordEncoder;

    // 로그인
    @PostMapping("/login")  
    public ResponseEntity<UserLoginPostRes> login(@RequestBody UserLoginPostReq loginInfo) {
        String userId = loginInfo.getId();
        String password = loginInfo.getPassword();

        Student student = userService.getStudentByUserId(userId);
        Therapist therapist = userService.getTherapistByUserId(userId);
        if(student == null && therapist == null) {
            return ResponseEntity.status(404).body(UserLoginPostRes.of(404,"존재하지 않는 계정입니다.",null));
        } else if(student != null){
            if(passwordEncoder.matches(password, student.getStudentPassword())) {
                System.out.println("엑세스토큰: " + JwtTokenUtil.getToken(userId));
                return ResponseEntity.ok(UserLoginPostRes.of(200, "Success", JwtTokenUtil.getToken(userId)));
            }
        } else {
            if(passwordEncoder.matches(password, therapist.getTherapistPassword())) {
                System.out.println("엑세스토큰: " + JwtTokenUtil.getToken(userId));
                return ResponseEntity.ok(UserLoginPostRes.of(200, "Success", JwtTokenUtil.getToken(userId)));
            }
        }
        return ResponseEntity.status(401).body(UserLoginPostRes.of(401, "잘못된 비밀번호입니다.", null));
    }

    // 비밀번호 찾기_마르마르의 회원인지 체크하기
    @GetMapping("/check/findPw")
    public @ResponseBody Map<String, Boolean> pw_find(@RequestBody FindPassPostReq findPassPostReq){
        Map<String,Boolean> json = new HashMap<>();

        if(findPassPostReq.getRole().equals("STUDENT")){
            boolean pwFindCheck = userService.studentIdEmailCheck(findPassPostReq.getEmail(),findPassPostReq.getId());
            json.put("check", pwFindCheck);
            return json;
        } else {
            boolean pwFindCheck = userService.therapistIdEmailCheck(findPassPostReq.getEmail(),findPassPostReq.getId());
            json.put("check", pwFindCheck);
            return json;
        }
    }

    // /check/findPw에서 true가 나왔다면, 임시 비밀번호를 이메일로 발급해주기 -> 비밀번호는 임시 비밀번호로 수정됨
    @PostMapping("/check/findPw/sendEmail")
    public @ResponseBody void sendEmail(@RequestBody FindPassPostReq findPassPostReq) throws Exception {
        MailDto dto = sendEmailService.createMailAndChangePassword(findPassPostReq.getEmail(),findPassPostReq.getId(), findPassPostReq.getRole());
        sendEmailService.mailSend(dto);
    }

    // 아이디 찾기_마르마르의 회원인지 체크하기
    @GetMapping("/check/findId")
    public @ResponseBody Map<String, Boolean> id_find(@RequestBody FindIdPostReq findIdPostReq){
        Map<String,Boolean> json = new HashMap<>();

        if(findIdPostReq.getRole().equals("STUDENT")){
            boolean pwFindCheck = userService.studentPwdEmailCheck(findIdPostReq.getEmail(),findIdPostReq.getName());
            System.out.println(pwFindCheck);
            json.put("check", pwFindCheck);
            return json;
        } else {
            boolean pwFindCheck = userService.therapistPwdEmailCheck(findIdPostReq.getEmail(),findIdPostReq.getName());
            System.out.println(pwFindCheck);
            json.put("check", pwFindCheck);
            return json;
        }
    }

    // /check/findId에서 true가 나왔다면, 해당 회원의 아이디를 return
    @PostMapping("/check/findId/showId")
    public ResponseEntity<String> showId(@RequestBody FindIdPostReq findIdPostReq) throws Exception {
        if(findIdPostReq.getRole().equals("STUDENT")){
            Student student = userService.getStudentByUserEmail(findIdPostReq.getEmail());
            return ResponseEntity.status(200).body(student.getStudentId());
        } else {
            Therapist therapist = userService.getTherapistByUserEmail(findIdPostReq.getEmail());
            return ResponseEntity.status(200).body(therapist.getTherapistId());
        }

    }

}
