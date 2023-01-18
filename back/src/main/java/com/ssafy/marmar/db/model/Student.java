package com.ssafy.marmar.db.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.Date;

//@JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd", timezone="Asia/Seoul")

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@DynamicInsert
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int num;

    @Column(nullable = false, length = 100)
    private String userNameHelper;

    @Column(nullable = false, length = 100)
    private String userName;

    @Column(nullable = false, length = 100)
    private String userId;

    @Column(nullable = false, length = 100)
    private String userPassword;

    @Column(nullable = false, length = 100)
    private String userPasswordHelper;

    @Column(nullable = false, length = 100)
    private Date userBirth;

    @Column(nullable = false, length = 100)
    private String userPhoneHelper;

    // @Enumerated(EnumType.STRING)
    @ColumnDefault("'STUDENT'")
    private String role;

    @Column(nullable = false, length = 100)
    private String userEmailId;

    @Column(nullable = false, length = 100)
    private String userEmailDomain;

    @ColumnDefault("false")
    private boolean isOngoing;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="therapistNum")
    private Therapist therapist; // DB는 오브젝트를 저장할 수 없다. FK, 자바는 오브젝트를 저장할 수 있다.
}
