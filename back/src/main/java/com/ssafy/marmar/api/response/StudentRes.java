package com.ssafy.marmar.api.response;

import com.ssafy.marmar.db.model.Student;
import com.ssafy.marmar.db.model.Therapist;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class StudentRes {
    int num;
    String role;
    String studentId;
    String studentPassword;
    String studentPasswordHelper;
    String studentNameHelper;
    String studentName;
    Date studentBirth;
    String studentPhoneHelper;
    String studentEmail;
    boolean isOngoing;
    Therapist therapist;

    public static StudentRes of(Student student){
        StudentRes res = new StudentRes();

        res.setNum(student.getNum());
        res.setRole(student.getRole());
        res.setStudentId(student.getStudentId());
        res.setStudentPassword(student.getStudentPassword());
        res.setStudentPasswordHelper(student.getStudentPasswordHelper());
        res.setStudentName(student.getStudentName());
        res.setStudentBirth(student.getStudentBirth());
        res.setStudentPhoneHelper(student.getStudentPhoneHelper());
        res.setStudentEmail(student.getStudentEmail());
        res.setOngoing(student.isOngoing());
        res.setTherapist(student.getTherapist());

        return res;
    }

}
