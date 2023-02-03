package com.ssafy.marmar.db.repository;


import com.ssafy.marmar.db.model.Picture;
import com.ssafy.marmar.db.model.Watch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface PictureProgramRepository extends JpaRepository<Picture, Integer> {

    List<Picture> findAllByDifficulty(String difficulty);
    Picture findByNum(int num);

}
