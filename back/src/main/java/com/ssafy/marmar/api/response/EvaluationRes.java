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
    int evalAbility;
    int evalAttitude;
    int evalConcentration;
    LocalDateTime evalDate;
    Student student;

    @Builder
    public EvaluationRes(int num, int evalAbility, int evalAttitude, int evalConcentration, LocalDateTime evalDate, Student student){
        this.num = num;
        this.evalAbility = evalAbility;
        this.evalAttitude = evalAttitude;
        this.evalConcentration = evalConcentration;
        this.evalDate = evalDate;
        this.student = student;
    }
}
