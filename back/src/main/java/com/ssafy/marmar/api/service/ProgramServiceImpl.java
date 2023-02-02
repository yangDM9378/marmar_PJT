package com.ssafy.marmar.api.service;

import com.ssafy.marmar.api.response.WatchRes;
import com.ssafy.marmar.api.response.WordRes;
import com.ssafy.marmar.db.model.Watch;
import com.ssafy.marmar.db.model.Wordspeaking;
import com.ssafy.marmar.db.repository.WatchProgramRepository;
import com.ssafy.marmar.db.repository.WordProgramRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Service
public class ProgramServiceImpl implements ProgramService{

    @Autowired
    WordProgramRepository wordProgramRepository;

    @Autowired
    WatchProgramRepository watchProgramRepository;

    @Override
    public List<WordRes> wordlist(String difficulty) {

        List<Wordspeaking> words = wordProgramRepository.findAllByDifficulty(difficulty);
        List<WordRes> wordResList = new ArrayList<>();

        for(Wordspeaking word : words){
            WordRes res = WordRes.builder()
                    .num(word.getNum())
                    .answer(word.getAnswer())
                    .difficulty(word.getDifficulty())
                    .imagePath(word.getImagePath())
                    .voicePath(word.getVoicePath())
                    .build();
            wordResList.add(res);
        }

        return wordResList;
    }

    @Override
    public List<WordRes> wordgamelist() {

        List<Integer> highlist = selectNum("word", "high");
        List<Integer> middlelist = selectNum("word", "middle");
        List<Integer> lowlist = selectNum("word", "low");

        Collections.shuffle(highlist);
        Collections.shuffle(middlelist);
        Collections.shuffle(lowlist);

        List<Wordspeaking> words = new ArrayList<>();
        List<WordRes> wordResList = new ArrayList<>();

        for(int i=0; i<3; i++){
            words.add(wordProgramRepository.findByNum(lowlist.get(i)));
        }
        for(int i=0; i<4; i++){
            words.add(wordProgramRepository.findByNum(middlelist.get(i)));
        }
        for(int i=0; i<3; i++){
            words.add(wordProgramRepository.findByNum(highlist.get(i)));
        }

        for(Wordspeaking word : words){
            WordRes res = WordRes.builder()
                    .num(word.getNum())
                    .answer(word.getAnswer())
                    .difficulty(word.getDifficulty())
                    .imagePath(word.getImagePath())
                    .voicePath(word.getVoicePath())
                    .build();
            wordResList.add(res);
        }


        return wordResList;
    }

    @Override
    public List<WatchRes> watchlist(String difficulty) {

        List<Watch> watches = watchProgramRepository.findAllByDifficulty(difficulty);
        List<WatchRes> watchResList = new ArrayList<>();

        for(Watch watch : watches){
            WatchRes res = WatchRes.builder()
                    .num(watch.getNum())
                    .answer(watch.getAnswer())
                    .difficulty(watch.getDifficulty())
                    .imagePath(watch.getImagePath())
                    .voicePath(watch.getVoicePath())
                    .build();
            watchResList.add(res);
        }

        return watchResList;
    }

    @Override
    public List<WatchRes> watchgamelist() {

        List<Integer> highlist = selectNum("watch", "high");
        List<Integer> middlelist = selectNum("watch", "middle");
        List<Integer> lowlist = selectNum("watch", "low");

        Collections.shuffle(highlist);
        Collections.shuffle(middlelist);
        Collections.shuffle(lowlist);

        List<Watch> watches = new ArrayList<>();
        List<WatchRes> watchResList = new ArrayList<>();

        for(int i=0; i<3; i++){
            watches.add(watchProgramRepository.findByNum(lowlist.get(i)));
        }
        for(int i=0; i<4; i++){
            watches.add(watchProgramRepository.findByNum(middlelist.get(i)));
        }
        for(int i=0; i<3; i++){
            watches.add(watchProgramRepository.findByNum(highlist.get(i)));
        }

        for(Watch word : watches){
            WatchRes res = WatchRes.builder()
                    .num(word.getNum())
                    .answer(word.getAnswer())
                    .difficulty(word.getDifficulty())
                    .imagePath(word.getImagePath())
                    .voicePath(word.getVoicePath())
                    .build();
            watchResList.add(res);
        }


        return watchResList;
    }

    public List<Integer> selectNum(String game, String di) {
        if(game == "word"){
            List<Wordspeaking> Words = wordProgramRepository.findAllByDifficulty(di);
            List<Integer> WordsList = new ArrayList<>();

            for(Wordspeaking word : Words){
                WordsList.add(word.getNum());
            }

            return WordsList;
        } else {
            List<Watch> Watches = watchProgramRepository.findAllByDifficulty(di);
            List<Integer> WatchesList = new ArrayList<>();

            for(Watch watch : Watches){
                WatchesList.add(watch.getNum());
            }

            return WatchesList;
        }

    }

}



/*
자음 모음 분리 코드
        //String[] res;
        ArrayList<String> res = new ArrayList<>();

        String[] CHO = {"ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ",
                "ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"};

        String[] JOONG = {"ㅏ","ㅐ","ㅑ","ㅒ","ㅓ","ㅔ","ㅕ","ㅖ","ㅗ","ㅘ",
                "ㅙ","ㅚ","ㅛ","ㅜ","ㅝ","ㅞ","ㅟ","ㅠ","ㅡ","ㅢ","ㅣ"};

        String[] JONG = {"","ㄱ","ㄲ","ㄳ","ㄴ","ㄵ","ㄶ","ㄷ","ㄹ","ㄺ","ㄻ","ㄼ",
                "ㄽ","ㄾ","ㄿ","ㅀ","ㅁ","ㅂ","ㅄ","ㅅ","ㅆ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"};


        //String text = "안녕하세요. 닭가슴살은 퍽퍽하고, 스타벅스 자바칩프라푸치노 맛나요ㅋㅋ";

        for(int i = 0; i < wordSpeakingStudent.length(); i++) {

            StringBuilder sb = new StringBuilder();
            char uniVal = wordSpeakingStudent.charAt(i);

            // 한글일 경우만 시작해야 하기 때문에 0xAC00부터 아래의 로직을 실행한다
            if(uniVal >= 0xAC00) {
                System.out.print(uniVal + "=>");
                uniVal = (char)(uniVal - 0xAC00);

                char cho = (char)(uniVal/28/21);
                char joong = (char) ((uniVal)/28%21);
                char jong = (char) (uniVal % 28);	// 종성의 첫번째는 채움이기 때문에

                sb.append(CHO[cho]);
                sb.append(JOONG[joong]);
                sb.append(JONG[jong]);

                res.add(sb.toString());

                //System.out.println(CHO[cho] + JOONG[joong] + JONG[jong]);
            } else {
                res.add(String.valueOf(uniVal));
                //System.out.println(uniVal + "=>" + uniVal);
            }
        }
 */
