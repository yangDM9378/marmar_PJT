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
    Optional<Therapist> findByTherapistEmail(String email);

    Therapist save(Therapist therapist);

    @Transactional
    @Modifying
    @Query("UPDATE Therapist set isOngoing = :inout where num = :therapistNum")
    void updateOngoing(@Param("inout")boolean inout, @Param("therapistNum")int therapistNum) throws Exception;

    @Transactional
    @Modifying
    @Query(value = "UPDATE therapist set program_room_name = :programRoomName where num = :therapistNum", nativeQuery = true)
    void updateProgramRoom(@Param("programRoomName")String programRoomName, @Param("therapistNum")int therapistNum) throws Exception;

    @Transactional
    @Modifying
    @Query(value = "UPDATE therapist set class_room_name = :classRoomName where num = :therapistNum", nativeQuery = true)
    void updateClassRoom(@Param("classRoomName")String classRoomName, @Param("therapistNum")int therapistNum) throws Exception;

    @Transactional
    @Modifying
    @Query(value = "UPDATE therapist t set t.therapist_password = :therapist_pw where t.num = :num", nativeQuery = true)
    void updateTherapistPassword(@Param("therapist_pw")String therapist_pw, @Param("num")int num) throws Exception;

    @Transactional
    @Modifying
    @Query(value = "UPDATE therapist t set t.therapist_password = :therapist_pwd where t.therapist_id = :userId", nativeQuery = true)
    void modifyTherapistPassword(@Param("userId")String userId, @Param("therapist_pwd")String therapist_pwd) throws Exception;

    @Transactional
    @Modifying
    @Query(value = "UPDATE therapist t set t.therapist_name = :modifyname where t.therapist_id = :userId", nativeQuery = true)
    void modifyTherapistName(@Param("userId")String userId, @Param("modifyname")String modifyname) throws Exception;

    @Transactional
    @Modifying
    @Query(value = "UPDATE therapist t set t.therapist_phone = :modifyphone where t.therapist_id = :userId", nativeQuery = true)
    void modifyTherapistPhone(@Param("userId")String userId, @Param("modifyphone")String modifyphone) throws Exception;

    @Transactional
    @Modifying
    @Query(value = "UPDATE therapist t set t.therapist_department = :modifydepartment where t.therapist_id = :userId", nativeQuery = true)
    void modifyTherapistDepartment(@Param("userId")String userId, @Param("modifydepartment")String modifydepartment) throws Exception;
}
