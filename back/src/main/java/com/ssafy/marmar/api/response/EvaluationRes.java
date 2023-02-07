package com.ssafy.marmar.api.response;

import com.ssafy.marmar.db.model.Student;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class EvaluationRes {

    int num;
    int evalConcentration;
    int evalAchieve;
    int evalEntire;
    LocalDateTime evalDate;
    Student student;

    @Builder
    public EvaluationRes(int num, int evalConcentration, int evalAchieve, int evalEntire, LocalDateTime evalDate, Student student){
        this.num = num;
        this.evalConcentration = evalConcentration;
        this.evalAchieve = evalAchieve;
        this.evalEntire = evalEntire;
        this.evalDate = evalDate;
        this.student = student;
    }
}
