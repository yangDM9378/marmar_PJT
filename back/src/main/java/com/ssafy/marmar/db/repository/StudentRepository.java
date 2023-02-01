package com.ssafy.marmar.db.repository;

import com.ssafy.marmar.db.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {
    Optional<Student> findByStudentId(String userId);
    Student save(Student student);
}
