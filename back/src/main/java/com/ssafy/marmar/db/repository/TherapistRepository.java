package com.ssafy.marmar.db.repository;

import com.ssafy.marmar.db.model.Student;
import com.ssafy.marmar.db.model.Therapist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface TherapistRepository extends JpaRepository<Therapist, Integer> {
    Optional<Therapist> findByTherapistId(String userId);
//    Optional<Therapist> findByNum(String userId);
    Therapist save(Therapist therapist);

    @Transactional
    @Modifying // select 문이 아님을 나타낸다
    @Query("UPDATE Therapist set isOngoing = :inout where num = :therapistNum")
    void updateOngoing(@Param("inout")boolean inout, @Param("therapistNum")int therapistNum) throws Exception;

    @Transactional
    @Modifying // select 문이 아님을 나타낸다
    @Query(value = "UPDATE therapist set program_room_name = :programRoomName where num = :therapistNum", nativeQuery = true)
    void updateProgramRoom(@Param("programRoomName")String programRoomName, @Param("therapistNum")int therapistNum) throws Exception;

    @Transactional
    @Modifying // select 문이 아님을 나타낸다
    @Query(value = "UPDATE therapist set class_room_name = :classRoomName where num = :therapistNum", nativeQuery = true)
    void updateClassRoom(@Param("classRoomName")String classRoomName, @Param("therapistNum")int therapistNum) throws Exception;
}
