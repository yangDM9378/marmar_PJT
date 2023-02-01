package com.ssafy.marmar.db.repository;


import com.ssafy.marmar.db.model.Programroom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface ProgramroomRepository extends JpaRepository<Programroom, Integer> {

    Programroom save(Programroom programRoom);

    @Transactional
    @Modifying // select 문이 아님을 나타낸다
    @Query("UPDATE Programroom set status = :inout, wordQuestionCnt = :wordQuestionCnt where name = :therapist_id")
    void updateStatus(@Param("inout")boolean inout, @Param("wordQuestionCnt")int wordQuestionCnt, @Param("therapist_id")String therapist_id) throws Exception;
}
