package com.ssafy.marmar.api.controller;

import com.ssafy.marmar.api.request.SelectGamePostReq;
import com.ssafy.marmar.api.service.ProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/program")
public class ProgramController {

    @Autowired
    ProgramService programService;

    @GetMapping("/practice/{category}/{difficulty}")
    public ResponseEntity<List<Object>> practiceList(@PathVariable String category, @PathVariable String difficulty){
        List<Object> list = programService.programlist(category, difficulty);
        return ResponseEntity.status(200).body(list);
    }

    @GetMapping("/game/{category}")
    public ResponseEntity<List<Object>> GameList(@PathVariable String category){
        List<Object> list = programService.selectList(category, "low", 3);
        List<Object> list2 = programService.selectList(category, "middle", 4);
        List<Object> list3 = programService.selectList(category, "high", 3);

        List<Object> res = new ArrayList<>();
        res.addAll(list);
        res.addAll(list2);
        res.addAll(list3);

        return ResponseEntity.status(200).body(res);
    }

    // 수업 중 프로그램
    @PostMapping("/game/select")
    public ResponseEntity<List<Object>> register(@RequestBody SelectGamePostReq selectGamePostReq){
        List<Object> list = programService.selectList(selectGamePostReq.getGame(), selectGamePostReq.getDifficulty(), selectGamePostReq.getNum());
        return ResponseEntity.status(200).body(list);
    }


    
}
