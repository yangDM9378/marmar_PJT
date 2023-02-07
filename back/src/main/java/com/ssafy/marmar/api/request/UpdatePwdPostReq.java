package com.ssafy.marmar.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdatePwdPostReq {
    String nowPassword;
    String modifyPassword;
}
