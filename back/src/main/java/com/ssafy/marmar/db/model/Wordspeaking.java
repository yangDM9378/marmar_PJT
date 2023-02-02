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
public class Wordspeaking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int num;

    @Column(nullable = false, length = 100)
    private String wordSpeakingQuestion;

    @Column
    private String difficulty;

    @Column(nullable = false, length = 100)
    private String imagePath;

}
