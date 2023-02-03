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
                // 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
                System.out.println("엑세스토큰: " + JwtTokenUtil.getToken(userId));
                return ResponseEntity.ok(UserLoginPostRes.of(200, "Success", JwtTokenUtil.getToken(userId)));
            }
        } else {
            if(passwordEncoder.matches(password, therapist.getTherapistPassword())) {
                // 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
                System.out.println("엑세스토큰: " + JwtTokenUtil.getToken(userId));
                return ResponseEntity.ok(UserLoginPostRes.of(200, "Success", JwtTokenUtil.getToken(userId)));
            }
        }
        // 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)

        // 유효하지 않는 패스워드인 경우, 로그인 실패로 응답.
        return ResponseEntity.status(401).body(UserLoginPostRes.of(401, "잘못된 비밀번호입니다.", null));
    }
//dto -> name, email, role

    @GetMapping("/check/findPw")
    public @ResponseBody Map<String, Boolean> pw_find(@RequestBody FindPassPostReq findPassPostReq){
        Map<String,Boolean> json = new HashMap<>();

        if(findPassPostReq.getRole().equals("STUDENT")){
            boolean pwFindCheck = userService.studentIdEmailCheck(findPassPostReq.getEmail(),findPassPostReq.getId());
            System.out.println(pwFindCheck);
            json.put("check", pwFindCheck);
            return json;
        } else {
            boolean pwFindCheck = userService.therapistIdEmailCheck(findPassPostReq.getEmail(),findPassPostReq.getId());
            System.out.println(pwFindCheck);
            json.put("check", pwFindCheck);
            return json;
        }
    }

    @PostMapping("/check/findPw/sendEmail")
    public @ResponseBody void sendEmail(@RequestBody FindPassPostReq findPassPostReq) throws Exception {
        MailDto dto = sendEmailService.createMailAndChangePassword(findPassPostReq.getEmail(),findPassPostReq.getId(), findPassPostReq.getRole());
        sendEmailService.mailSend(dto);
    }

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

    @PostMapping("/check/findId/showId")
    public ResponseEntity<String> showId(@RequestBody FindIdPostReq findIdPostReq) throws Exception {
        if(findIdPostReq.getRole().equals("STUDENT")){
            Student student = userService.getStudentByUserEmail(findIdPostReq.getEmail());
            String str = student.getStudentId();
            return ResponseEntity.status(200).body(str);
        } else {
            Therapist therapist = userService.getTherapistByUserEmail(findIdPostReq.getEmail());
            String str = therapist.getTherapistId();
            return ResponseEntity.status(200).body(str);
        }

       // MailDto dto = sendEmailService.createMailAndChangePassword(findPassPostReq.getEmail(),findPassPostReq.getId(), findPassPostReq.getRole());
        //sendEmailService.mailSend(dto);
    }

}
