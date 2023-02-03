package com.ssafy.marmar.api.service;

import com.ssafy.marmar.common.util.EncryptionUtils;
import com.ssafy.marmar.db.model.Student;
import com.ssafy.marmar.db.repository.StudentRepository;
import com.ssafy.marmar.db.repository.TherapistRepository;
import com.ssafy.marmar.dto.MailDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.apache.commons.mail.*;


@Service
public class SendEmailServiceImpl implements SendEmailService {

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    TherapistRepository therapistRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    long beginTime = System.currentTimeMillis();

    private static final String FROM_ADDRESS = "본인의 이메일 주소를 입력하세요!";

    @Override
    public MailDto createMailAndChangePassword(String userEmail, String userName, String role) throws Exception {
        String str = getTempPassword();
        MailDto dto = new MailDto();
        dto.setAddress(userEmail);
        dto.setTitle(userName+"님의 MARMAR 임시비밀번호 안내 이메일 입니다.");
        dto.setMessage("안녕하세요. MARMAR 임시비밀번호 안내 관련 이메일 입니다." + "[" + userName + "]" +"님의 임시 비밀번호는 "
                + str + " 입니다.");

        dto.setRole(role);
        dto.setPwd(str);
        return dto;
    }

    @Override
    public void mailSend(MailDto mailDto) throws Exception {

        if(mailDto.getRole().equals("STUDENT")){
            System.out.println("he");
            int num = studentRepository.findByStudentEmail(mailDto.getAddress()).get().getNum();
            String str = passwordEncoder.encode(mailDto.getPwd());
            studentRepository.updateStudentPassword(str, num);
        } else{
            int num = therapistRepository.findByTherapistEmail(mailDto.getAddress()).get().getNum();
            System.out.println("hello");
            String str = passwordEncoder.encode(mailDto.getPwd());
            therapistRepository.updateTherapistPassword(str, num);
        }
        System.out.println("이멜 전송 완료!");
        SimpleEmail email = new SimpleEmail();
        email.setCharset("euc-kr");
        email.setDebug(true);
        email.setHostName("smtp.gmail.com");
        email.setAuthentication("marmar204204c@gmail.com", "qlmzstadubtyodpt");
        email.setSmtpPort(587);
        email.setSSL(true);
        email.setSSLOnConnect(true);   // SSL 사용 설정
        email.setStartTLSEnabled(true);  // TLS 사용 설정

        String result = "fail";
        try {
            email.setFrom("marmar204204c@gmail.com", "마르마르", "UTF-8");
            email.addTo(mailDto.getAddress(), "받는사람이름", "UTF-8");
            email.setSubject(mailDto.getTitle());
            email.setMsg(mailDto.getMessage());
            result = email.send();
        } catch (EmailException e) {
            e.printStackTrace();
        } finally {
            long execTime = System.currentTimeMillis() - beginTime ;
            System.out.println("execTime : " + execTime);
            System.out.println("result : " + result);
        }

    }

//    public void updateStudentPassword(String str, String userEmail) throws Exception {
//        String pw = EncryptionUtils.encryptMD5(str);
//        String id = studentRepository.findByStudentEmail(userEmail).get().getStudentId();
//        studentRepository.updateStudentPassword(id,pw);
//    }
//
//    public void updateTherapistPassword(String str, String userEmail) throws Exception {
//        String pw = EncryptionUtils.encryptMD5(str);
//        String id = therapistRepository.findByTherapistEmail(userEmail).get().getTherapistId();
//        therapistRepository.updateTherapistPassword(id,pw);
//    }


    public String getTempPassword(){
        char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
                'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };

        String str = "";

        int idx = 0;
        for (int i = 0; i < 10; i++) {
            idx = (int) (charSet.length * Math.random());
            str += charSet[idx];
        }
        return str;
    }

}
