package com.ssafy.marmar.api.response;

import com.ssafy.marmar.db.model.Watch;
import com.ssafy.marmar.db.model.Wordspeaking;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WatchRes {

    int num;
    String answer;
    String difficulty;
    String imagePath;


    public Watch toEntity(){
        Watch build = Watch.builder()
                .num(num)
                .answer(answer)
                .difficulty(difficulty)
                .imagePath(imagePath)
                .build();
        return build;
    }


    @Builder
    public WatchRes(int num,String answer, String difficulty, String imagePath){
        this.num = num;
        this.answer = answer;
        this.difficulty = difficulty;
        this.imagePath = imagePath;
    }



}
