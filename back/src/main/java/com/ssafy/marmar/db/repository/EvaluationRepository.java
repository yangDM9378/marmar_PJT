package com.ssafy.marmar.db.repository;

import com.ssafy.marmar.db.model.Evaluation;

import com.ssafy.marmar.db.model.Watch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EvaluationRepository extends JpaRepository<Evaluation, Integer> {
    Evaluation save(Evaluation evaluation);
    List<Evaluation> findAllByStudentNum(int studentNum);
}
