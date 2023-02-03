package com.ssafy.marmar.db.repository;


import com.ssafy.marmar.db.model.Student;
import com.ssafy.marmar.db.model.Wordspeaking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface WordProgramRepository extends JpaRepository<Wordspeaking, Integer> {

    List<Wordspeaking> findAllByDifficulty(String difficulty);
    Wordspeaking findByNum(int num);

}
