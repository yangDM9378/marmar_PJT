package com.ssafy.marmar.db.repository;


import com.ssafy.marmar.db.model.Watch;
import com.ssafy.marmar.db.model.Wordspeaking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface WatchProgramRepository extends JpaRepository<Watch, Integer> {

    List<Watch> findAllByDifficulty(String difficulty);
    Watch findByNum(int num);

}
