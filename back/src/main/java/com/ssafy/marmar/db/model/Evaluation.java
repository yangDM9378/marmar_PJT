package com.ssafy.marmar.db.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@DynamicInsert
public class Evaluation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int num;

    @Column(nullable = false)
    private int evalAbility;

    @Column(nullable = false)
    private int evalAttitude;

    @Column(nullable = false)
    private int evalConcentration;

    @Column(columnDefinition = "LONGTEXT")
    private String comments;

    @Column
    private LocalDate evalDate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="studentNum")
    private Student student; // DB는 오브젝트를 저장할 수 없다. FK, 자바는 오브젝트를 저장할 수 있다.

}
