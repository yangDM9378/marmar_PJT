package com.ssafy.marmar.api.service;

import com.ssafy.marmar.api.response.PictureRes;
import com.ssafy.marmar.api.response.WatchRes;
import com.ssafy.marmar.api.response.WordRes;

import java.util.List;

public interface ProgramService {

    List<Object> programlist(String category, String difficulty);
    List<Object> selectList(String category, String difficulty, int num);

}
