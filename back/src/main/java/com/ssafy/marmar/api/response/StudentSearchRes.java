package com.ssafy.marmar.api.response;

import com.ssafy.marmar.db.model.Student;
import com.ssafy.marmar.db.model.Therapist;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class StudentSearchRes {
    int num;
    String studentName;
    String studentId;

    public Student toEntity(){
        Student build = Student.builder()
                .num(num)
                .studentName(studentName)
                .studentId(studentId)
                .build();
        return build;
    }

    @Builder
    public StudentSearchRes(int num, String studentName, String studentId){
        this.num = num;
        this.studentName = studentName;
        this.studentId = studentId;
    }

}
