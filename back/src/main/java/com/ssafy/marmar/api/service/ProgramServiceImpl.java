package com.ssafy.marmar.api.service;

import com.ssafy.marmar.api.response.PictureRes;
import com.ssafy.marmar.api.response.WatchRes;
import com.ssafy.marmar.api.response.WordRes;
import com.ssafy.marmar.db.model.Picture;
import com.ssafy.marmar.db.model.Watch;
import com.ssafy.marmar.db.model.Wordspeaking;
import com.ssafy.marmar.db.repository.PictureProgramRepository;
import com.ssafy.marmar.db.repository.WatchProgramRepository;
import com.ssafy.marmar.db.repository.WordProgramRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class ProgramServiceImpl implements ProgramService{

    @Autowired
    WordProgramRepository wordProgramRepository;

    @Autowired
    WatchProgramRepository watchProgramRepository;

    @Autowired
    PictureProgramRepository pictureProgramRepository;

    @Override
    public List<Object> programlist(String category, String difficulty) {
        if(category.equals("word")){
            List<Wordspeaking> words = wordProgramRepository.findAllByDifficulty(difficulty);
            List<WordRes> wordResList = new ArrayList<>();
            return Collections.singletonList(wordResList(wordResList, words));
        } else if(category.equals("clock")){
            List<Watch> watches = watchProgramRepository.findAllByDifficulty(difficulty);
            List<WatchRes> watchResList = new ArrayList<>();
            return Collections.singletonList(watchResList(watchResList, watches));
        } else if(category.equals("picture")){
            List<Picture> pictures = pictureProgramRepository.findAllByDifficulty(difficulty);
            List<PictureRes> pictureResList = new ArrayList<>();
            return Collections.singletonList(pictureResList(pictureResList, pictures));
        } else {
            return null;
        }
    }

    @Override
    public List<Object> selectList(String category, String difficulty, int num) {
        List<Integer> list = selectNum(category, difficulty);
        Collections.shuffle(list);

        if(category.equals("word")){
            List<Wordspeaking> words = new ArrayList<>();
            List<WordRes> wordResList = new ArrayList<>();
            for(int i=0; i<num; i++){
                words.add(wordProgramRepository.findByNum(list.get(i)));
            }
            return Collections.singletonList(wordResList(wordResList, words));
        } else if(category.equals("clock")){
            List<Watch> watches = new ArrayList<>();
            List<WatchRes> watchResList = new ArrayList<>();
            for(int i=0; i<num; i++){
                watches.add(watchProgramRepository.findByNum(list.get(i)));
            }
            return Collections.singletonList(watchResList(watchResList, watches));
        } else if(category.equals("picture")){
            List<Picture> pictures = new ArrayList<>();
            List<PictureRes> pictureResList = new ArrayList<>();
            for(int i=0; i<num; i++){
                pictures.add(pictureProgramRepository.findByNum(list.get(i)));
            }
            return Collections.singletonList(pictureResList(pictureResList, pictures));
        } else{
            return null;
        }
    }

    public List<WordRes> wordResList(List<WordRes> wordResList, List<Wordspeaking> words){
        for(Wordspeaking word : words){
            WordRes res = WordRes.builder()
                    .num(word.getNum())
                    .answer(word.getAnswer())
                    .difficulty(word.getDifficulty())
                    .imagePath(word.getImagePath())
                    .build();
            wordResList.add(res);
        }
        return wordResList;
    }

    public List<WatchRes> watchResList(List<WatchRes> watchResList, List<Watch> watches){
        for(Watch watch : watches){
            WatchRes res = WatchRes.builder()
                    .num(watch.getNum())
                    .answer(watch.getAnswer())
                    .difficulty(watch.getDifficulty())
                    .imagePath(watch.getImagePath())
                    .build();
            watchResList.add(res);
        }
        return watchResList;
    }

    public List<PictureRes> pictureResList(List<PictureRes> pictureResList, List<Picture> pictures){
        for(Picture picture : pictures){
            PictureRes res = PictureRes.builder()
                    .num(picture.getNum())
                    .answer(picture.getAnswer())
                    .difficulty(picture.getDifficulty())
                    .pictureOne(picture.getPictureOne())
                    .pictureTwo(picture.getPictureTwo())
                    .pictureThree(picture.getPictureThree())
                    .pictureFour(picture.getPictureFour())
                    .build();
            pictureResList.add(res);
        }
        return pictureResList;
    }

    public List<Integer> selectNum(String game, String di) {
        if(game.equals("word")){
            List<Wordspeaking> Words = wordProgramRepository.findAllByDifficulty(di);
            List<Integer> WordsList = new ArrayList<>();
            for(Wordspeaking word : Words){
                WordsList.add(word.getNum());
            }
            return WordsList;
        } else if(game.equals("clock")){
            List<Watch> Watches = watchProgramRepository.findAllByDifficulty(di);
            List<Integer> WatchesList = new ArrayList<>();
            for(Watch watch : Watches){
                WatchesList.add(watch.getNum());
            }
            return WatchesList;
        } else {
            List<Picture> Pictures = pictureProgramRepository.findAllByDifficulty(di);
            List<Integer> PicturesList = new ArrayList<>();
            for(Picture picture : Pictures){
                PicturesList.add(picture.getNum());
            }
            return PicturesList;
        }

    }
}
