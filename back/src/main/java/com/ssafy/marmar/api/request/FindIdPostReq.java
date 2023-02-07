package com.ssafy.marmar.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FindIdPostReq {
    //name, email, role
    String name;
    String email;
    String role;
}
