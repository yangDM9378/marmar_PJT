package com.ssafy.marmar.api.request;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class StudentRegisterPostRes {

    String id;
    String password;
    String passwordHelper;
    String name;
    String nameHelper;
    Date birth;
    String phoneHelper;
    String emailId;
    String emailDomain;

}
