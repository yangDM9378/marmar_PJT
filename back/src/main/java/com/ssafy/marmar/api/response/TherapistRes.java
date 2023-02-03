package com.ssafy.marmar.api.response;

import com.ssafy.marmar.db.model.Student;
import com.ssafy.marmar.db.model.Therapist;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TherapistRes {

    int num;
    String role;
    String therapistId;
    String therapistPassword;
    String therapistName;
    String therapistDepartment;
    String therapistEmail;
    String therapistPhone;
    boolean isOngoing;

    public static TherapistRes of(Therapist therapist){
        TherapistRes res = new TherapistRes();

        res.setNum(therapist.getNum());
        res.setRole(therapist.getRole());
        res.setTherapistId(therapist.getTherapistId());
        res.setTherapistPassword(therapist.getTherapistPassword());
        res.setTherapistName(therapist.getTherapistName());
        res.setTherapistDepartment(therapist.getTherapistDepartment());
        res.setTherapistPhone(therapist.getTherapistPhone());
        res.setTherapistEmail(therapist.getTherapistEmail());
        res.setOngoing(therapist.isOngoing());


        return res;
    }


}
