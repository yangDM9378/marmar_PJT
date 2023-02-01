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
    String watchQuestion;
    String difficulty;
    String imagePath;
    String voicePath;


    public Watch toEntity(){
        Watch build = Watch.builder()
                .num(num)
                .watchQuestion(watchQuestion)
                .difficulty(difficulty)
                .imagePath(imagePath)
                .voicePath(voicePath)
                .build();
        return build;
    }


    @Builder
    public WatchRes(int num,String watchQuestion, String difficulty, String imagePath, String voicePath){
        this.num = num;
        this.watchQuestion = watchQuestion;
        this.difficulty = difficulty;
        this.imagePath = imagePath;
        this.voicePath = voicePath;
    }



}
