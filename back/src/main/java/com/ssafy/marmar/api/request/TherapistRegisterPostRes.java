package com.ssafy.marmar.api.request;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class TherapistRegisterPostRes {

    String id;
    String password;
    String name;
    String phone;
    String emailId;
    String emailDomain;
    String department;

}
