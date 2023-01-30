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
public class Wordimage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int num;

    @Column(nullable = false, length = 100)
    private String originName;

    @Column(nullable = false, length = 100)
    private String path;

    @Column(nullable = false, length = 100)
    private String savedName;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="wordNum")
    private Wordspeaking wordspeaking;

}
