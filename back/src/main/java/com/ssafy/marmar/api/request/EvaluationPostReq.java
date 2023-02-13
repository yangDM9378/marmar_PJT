package com.ssafy.marmar.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EvaluationPostReq {

    int evalAbility;
    int evalAttitude;
    int evalConcentration;
    String comments;

}
