package com.ssafy.marmar.db.repository;


import com.ssafy.marmar.db.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {

    Optional<Student> findByStudentId(String userId);
    Student save(Student student);

    @Query("SELECT s from Student s where s.studentName like %:search% AND s.therapist is null")
    List<Student> findstudent(@Param("search")String search) throws Exception;

//    List<Student> findByStudentNameContaining(String searchKeyword);

    List<Student> findByTherapistNum(int therapistNum);


    //update student set therapist_num=1 where num = 1;
    @Transactional
    @Modifying // select 문이 아님을 나타낸다
    @Query(value = "UPDATE student s set s.therapist_num = :therapist_num where s.num = :student_num", nativeQuery = true)
    void updateTherapist(@Param("student_num")int student_num, @Param("therapist_num")int therapist_num) throws Exception;


    @Transactional
    @Modifying // select 문이 아님을 나타낸다
    @Query("UPDATE Student set therapist = NULL where num = :student_num")
    void deleteTherapist(@Param("student_num")int student_num) throws Exception;
}
