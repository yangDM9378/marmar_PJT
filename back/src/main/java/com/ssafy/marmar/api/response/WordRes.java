package com.ssafy.marmar.api.response;

import com.ssafy.marmar.db.model.Student;
import com.ssafy.marmar.db.model.Wordspeaking;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WordRes {

    int num;
    String wordSpeakingQuestion;
    String difficulty;
    String imagePath;
    String voicePath;


    public Wordspeaking toEntity(){
        Wordspeaking build = Wordspeaking.builder()
                .num(num)
                .wordSpeakingQuestion(wordSpeakingQuestion)
                .difficulty(difficulty)
                .imagePath(imagePath)
                .voicePath(voicePath)
                .build();
        return build;
    }


    @Builder
    public WordRes(int num, String wordSpeakingQuestion, int wordSpeakingResult, String difficulty, String imagePath, String voicePath){
        this.num = num;
        this.wordSpeakingQuestion = wordSpeakingQuestion;
        this.difficulty = difficulty;
        this.imagePath = imagePath;
        this.voicePath = voicePath;
    }



}
