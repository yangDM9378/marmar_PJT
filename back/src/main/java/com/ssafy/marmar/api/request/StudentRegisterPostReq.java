package com.ssafy.marmar.api.request;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class StudentRegisterPostReq {

    String id;
    String password;
    String passwordHelper;
    String name;
    String nameHelper;
    Date birth;
    String phoneHelper;
    String email;

}
