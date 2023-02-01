package com.ssafy.marmar.api.controller;

import com.ssafy.marmar.api.response.WatchRes;
import com.ssafy.marmar.api.response.WordRes;
import com.ssafy.marmar.api.service.ProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/program")
public class ProgramController {

    @Autowired
    ProgramService programService;

    @GetMapping("/word/{difficulty}")
    public ResponseEntity<List<WordRes>> wordspeakingList(@PathVariable String difficulty){
        List<WordRes> list = programService.wordlist(difficulty);
        return ResponseEntity.status(200).body(list);
    }

    @GetMapping("/word/game")
    public ResponseEntity<List<WordRes>> wordGameList(){
        List<WordRes> list = programService.wordgamelist();
        return ResponseEntity.status(200).body(list);
    }

    @GetMapping("/clock/{difficulty}")
    public ResponseEntity<List<WatchRes>> watchList(@PathVariable String difficulty){
        List<WatchRes> list = programService.watchlist(difficulty);
        return ResponseEntity.status(200).body(list);
    }

    @GetMapping("/clock/game")
    public ResponseEntity<List<WatchRes>> watchGameList(){
        List<WatchRes> list = programService.watchgamelist();
        return ResponseEntity.status(200).body(list);
    }

}
