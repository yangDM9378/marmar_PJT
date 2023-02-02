package com.ssafy.marmar.api.service;

import com.ssafy.marmar.api.response.WatchRes;
import com.ssafy.marmar.api.response.WordRes;

import java.util.List;

public interface ProgramService {

    List<WordRes> wordlist(String difficulty);
    List<WordRes> wordgamelist();

    List<WatchRes> watchlist(String difficulty);
    List<WatchRes> watchgamelist();

    List<WatchRes> selectWatchGameList(String difficulty, int num);

    List<WordRes> selectWordGameList(String difficulty, int num);
}
