package com.ssafy.marmar.api.controller;

import com.ssafy.marmar.api.request.EvaluationPostReq;
import com.ssafy.marmar.api.request.StudentRegisterPostReq;
import com.ssafy.marmar.api.request.UpdatePwdPostReq;
import com.ssafy.marmar.api.response.EvaluationRes;
import com.ssafy.marmar.api.response.StudentRes;
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

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
//import java.sql.Date;
import java.util.*;

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
        }catch(NoSuchElementException e){
            try{
                studentService.getUserByUserEmail(studentEmail);
            } catch(NoSuchElementException e1){
                return ResponseEntity.status(200).body(true);
            }
        }
        return ResponseEntity.status(200).body(false);
    }

    @PostMapping()
    public ResponseEntity<String> register(@RequestBody StudentRegisterPostReq registerInfo){
        studentService.createUser(registerInfo);
        return ResponseEntity.status(200).body("회원가입에 성공하였습니다.");
    }

    @GetMapping("/me")
    public ResponseEntity<StudentRes> getStudentInfo(Authentication authentication) {
        StudentDetails userDetails = (StudentDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        Student user = studentService.getUserByUserId(userId);
        return ResponseEntity.status(200).body(StudentRes.of(user));
    }

    @PutMapping("/selectTherapist/{studentNum}")
    public ResponseEntity<String> updateTherapistNum(@PathVariable int studentNum, Authentication authentication) throws Exception {
        int therapistNum = getTherapistNum(authentication);
        studentService.updateTherapistNum(studentNum, therapistNum);
        return ResponseEntity.status(200).body("담당 선생님이 업데이트 되었습니다.");
    }

    @PutMapping("/deleteTherapist/{studentNum}")
    public ResponseEntity<String> deleteTherapistNum(@PathVariable int studentNum) throws Exception {
        studentService.deleteTherapistNum(studentNum);
        return ResponseEntity.status(200).body("담당 선생님이 삭제 되었습니다.");
    }

    @PostMapping("/check/PasswordHelper")
    public @ResponseBody Map<String, Boolean> pw_find(@RequestBody Map<String, String> student_password_helper, Authentication authentication){
        Map<String,Boolean> json = new HashMap<>();
        StudentDetails studentDetails = (StudentDetails) authentication.getDetails();
        String userId = studentDetails.getUsername();
        Student student = studentService.getUserByUserId(userId);
        boolean pwFindCheck = studentService.studentHelperPwdCheck(student, student_password_helper.get("student_password_helper"));
        json.put("check", pwFindCheck);
        return json;
    }

    // 회원 정보 수정
    // 비밀번호, 2차 비밀번호, 학생 이름, 보호자 이름, 핸드폰 번호, 생년월일
    @PutMapping("/modify/Password")
    public ResponseEntity<Boolean> modifyPassword(@RequestBody UpdatePwdPostReq updatePwdPostReq, Authentication authentication) throws Exception {
        StudentDetails studentDetails = (StudentDetails) authentication.getDetails();
        String userId = studentDetails.getUsername();
        boolean res = studentService.modifyPwd(userId, updatePwdPostReq);
        return ResponseEntity.status(200).body(res);
    }

    @PutMapping("/modify/PasswordHelper")
    public ResponseEntity<String> modifyPasswordHelper(@RequestBody Map<String, String> modifyPasswordHelper, Authentication authentication) throws Exception {
        StudentDetails studentDetails = (StudentDetails) authentication.getDetails();
        String userId = studentDetails.getUsername();
        String modifypwdhelper = modifyPasswordHelper.get("modifyPasswordHelper");
        studentService.modifyPwdHelper(userId, modifypwdhelper);
        return ResponseEntity.status(200).body("2차 비밀번호 수정 성공");
    }

    @PutMapping("/modify/name")
    public ResponseEntity<String> modifyName(@RequestBody Map<String, String> name, Authentication authentication) throws Exception {
        StudentDetails studentDetails = (StudentDetails) authentication.getDetails();
        String userId = studentDetails.getUsername();
        String modifyname = name.get("name");
        studentService.modifyName(userId, modifyname);
        return ResponseEntity.status(200).body("학생 이름 수정 성공");
    }

    @PutMapping("/modify/nameHelper")
    public ResponseEntity<String> modifyNameHelper(@RequestBody Map<String, String> nameHelper, Authentication authentication) throws Exception {
        StudentDetails studentDetails = (StudentDetails) authentication.getDetails();
        String userId = studentDetails.getUsername();
        String modifynamehelper = nameHelper.get("nameHelper");
        studentService.modifyNameHelper(userId, modifynamehelper);
        return ResponseEntity.status(200).body("보호자 이름 수정 성공");
    }

    @PutMapping("/modify/phone")
    public ResponseEntity<String> modifyPhone(@RequestBody Map<String, String> phone, Authentication authentication) throws Exception {
        StudentDetails studentDetails = (StudentDetails) authentication.getDetails();
        String userId = studentDetails.getUsername();
        String modifyphone = phone.get("phone");
        studentService.modifyPhone(userId, modifyphone);
        return ResponseEntity.status(200).body("전화번호 수정 성공");
    }

    @PutMapping("/modify/birth")
    public ResponseEntity<String> modifyBirth(@RequestBody Map<String, String> birth, Authentication authentication) throws Exception {
        StudentDetails studentDetails = (StudentDetails) authentication.getDetails();
        String userId = studentDetails.getUsername();
        String modifybirth = birth.get("birth");
        studentService.modifyBirth(userId, modifybirth);
        return ResponseEntity.status(200).body("생일 수정 성공");
    }

    @DeleteMapping("/delete/{password}")
    public ResponseEntity<String> deleteStudent(@PathVariable String password, Authentication authentication) throws Exception {
        StudentDetails studentDetails = (StudentDetails) authentication.getDetails();
        String userId = studentDetails.getUsername();
        Student student = studentService.getUserByUserId(userId);
        boolean res = studentService.checkPwd(password, student);
        if(res == true){
            studentService.deleteStudent(student);
            return ResponseEntity.status(200).body("탈퇴처리가 되었습니다. 그동안 이용해주셔서 감사합니다.");
        } else{
            return ResponseEntity.status(403).body("비밀번호를 다시 입력해주세요.");
        }
    }



    @PutMapping("/evaluation/{studentNum}")
    public ResponseEntity<Boolean> evaluation(@PathVariable int studentNum, @RequestBody EvaluationPostReq evaluationPostReq) {
        boolean res = studentService.insertEvaluation(studentNum, evaluationPostReq);
        return ResponseEntity.status(200).body(res);
    }

    @GetMapping("/evaluation/result/{studentNum}")
    public ResponseEntity<List<EvaluationRes>> evaluationResult(@PathVariable int studentNum) {
        List<EvaluationRes> list = studentService.selectList(studentNum);
        return ResponseEntity.status(200).body(list);
    }

    @PostMapping("/mypage/evaluation/result/{studentNum}")
    public ResponseEntity<List<EvaluationRes>> dateEvaluationResult(@PathVariable int studentNum, @RequestBody Map<String, LocalDate> date) throws Exception {
        List<EvaluationRes> list = studentService.selectDateList(studentNum, date.get("date"));

        return ResponseEntity.status(200).body(list);
    }

    public int getTherapistNum(Authentication authentication){
        TherapistDetails userDetails = (TherapistDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        Therapist user = therapistService.getUserByUserId(userId);
        return user.getNum();
    }


}
