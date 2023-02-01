package com.ssafy.marmar.db.repository;

import com.ssafy.marmar.db.model.Student;
import com.ssafy.marmar.db.model.Therapist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TherapistRepository extends JpaRepository<Therapist, Integer> {
    Optional<Therapist> findByTherapistId(String userId);
    Therapist save(Therapist therapist);
}
