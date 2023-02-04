package com.ssafy.marmar.db.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@DynamicInsert
public class Picture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int num;

    @Column(nullable = false, length = 100)
    private int answer;

    @Column(nullable = false, length = 100)
    private String difficulty;

    @Column(nullable = false, length = 100)
    private String pictureOne;

    @Column(nullable = false, length = 100)
    private String pictureTwo;

    @Column(nullable = false, length = 100)
    private String pictureThree;

    @Column(nullable = false, length = 100)
    private String pictureFour;
}
