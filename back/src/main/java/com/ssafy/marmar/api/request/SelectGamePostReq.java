package com.ssafy.marmar.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SelectGamePostReq {
    String game;
    String difficulty;
    int num;
}
