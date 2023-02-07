package com.ssafy.marmar.api.response;

import com.ssafy.marmar.db.model.Picture;
import com.ssafy.marmar.db.model.Wordspeaking;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PictureRes {

    int num;
    int answer;
    String difficulty;
    String pictureOne;
    String pictureTwo;
    String pictureThree;
    String pictureFour;

    @Builder
    public PictureRes(int num, int answer, String difficulty, String pictureOne, String pictureTwo, String pictureThree, String pictureFour){
        this.num = num;
        this.answer = answer;
        this.difficulty = difficulty;
        this.pictureOne = pictureOne;
        this.pictureTwo = pictureTwo;
        this.pictureThree = pictureThree;
        this.pictureFour = pictureFour;
    }



}
