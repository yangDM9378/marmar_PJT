package com.ssafy.marmar.api.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserLoginPostRes{
    String accessToken;

    public static UserLoginPostRes of(Integer statusCode, String message, String accessToken) {
        UserLoginPostRes res = new UserLoginPostRes();
//        res.setStatusCode(statusCode);
//        res.setMessage(message);
        res.setAccessToken(accessToken);
        return res;
    }
}