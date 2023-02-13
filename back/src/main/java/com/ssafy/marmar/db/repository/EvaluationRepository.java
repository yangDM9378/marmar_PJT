package com.ssafy.marmar.db.repository;

import com.ssafy.marmar.db.model.Evaluation;

import com.ssafy.marmar.db.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Repository
public interface EvaluationRepository extends JpaRepository<Evaluation, Integer> {
    Evaluation save(Evaluation evaluation);
    List<Evaluation> findAllByStudentNum(int studentNum);
    void delete(Evaluation evaluation);


//    List<Evaluation> dateFindAllByStudentNum(int studentNum, Date date);


    @Query("SELECT e from Evaluation e where e.student = :student AND e.evalDate = :date")
    List<Evaluation> dateFindAllByStudentNum(@Param("student") Student student, @Param("date") LocalDate date) throws Exception;
}
