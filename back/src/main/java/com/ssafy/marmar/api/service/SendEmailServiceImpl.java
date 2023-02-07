package com.ssafy.marmar.api.service;

import com.ssafy.marmar.db.repository.StudentRepository;
import com.ssafy.marmar.db.repository.TherapistRepository;
import com.ssafy.marmar.dto.MailDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class SendEmailServiceImpl implements SendEmailService {

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    TherapistRepository therapistRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JavaMailSender mailSender;

    @Override
    public MailDto createMailAndChangePassword(String userEmail, String userName, String role) throws Exception {
        String str = getTempPassword();
        MailDto dto = new MailDto();
        dto.setAddress(userEmail);
        dto.setTitle(userName+"님의 MARMAR 임시비밀번호 안내 이메일 입니다.");
        dto.setMessage("안녕하세요. MARMAR 임시비밀번호 안내 관련 이메일 입니다.\n" + "[" + userName + "]" +"님의 임시 비밀번호는 "
                + str + " 입니다.");
        dto.setRole(role);
        dto.setPwd(str);
        return dto;
    }

    @Override
    public String mailSend(MailDto mailDto) throws Exception {


        if(mailDto.getRole().equals("STUDENT")){
            int num = studentRepository.findByStudentEmail(mailDto.getAddress()).get().getNum();
            String str = passwordEncoder.encode(mailDto.getPwd());
            studentRepository.updateStudentPassword(str, num);
        } else{
            int num = therapistRepository.findByTherapistEmail(mailDto.getAddress()).get().getNum();
            String str = passwordEncoder.encode(mailDto.getPwd());
            therapistRepository.updateTherapistPassword(str, num);
        }

        String result = "fail";
        try {
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setTo(mailDto.getAddress());
            simpleMailMessage.setSubject(mailDto.getTitle());
            simpleMailMessage.setText(mailDto.getMessage());
            mailSender.send(simpleMailMessage);
            result = "메일 전송 성공";
        } catch (Exception e){
            e.printStackTrace();
        } finally {
            return result;
        }

    }


    // 발급할 임시 비밀번호 생성 알고리즘
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
