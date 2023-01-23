package com.ssafy.marmar.api.controller;

import com.ssafy.marmar.api.request.UserLoginPostReq;
import com.ssafy.marmar.api.response.UserLoginPostRes;
import com.ssafy.marmar.api.service.UserService;
import com.ssafy.marmar.common.util.JwtTokenUtil;
import com.ssafy.marmar.db.model.Student;
import com.ssafy.marmar.db.model.Therapist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    UserService userService;

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

}
