package com.ssafy.marmar.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FindPassPostReq {
    String id;
    String email;
    String role;
}
