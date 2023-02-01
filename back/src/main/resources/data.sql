

CREATE TABLE `class_room` (
                              `num` int NOT NULL AUTO_INCREMENT,
                              `status` bit(1) NOT NULL DEFAULT b'0',
                              `word_question_cnt` int NOT NULL,
                              PRIMARY KEY (`num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `therapist` (
                             `num` int NOT NULL AUTO_INCREMENT,
                             `is_ongoing` bit(1) NOT NULL DEFAULT b'0',
                             `role` varchar(255) DEFAULT 'THERAPIST',
                             `therapist_department` varchar(100) NOT NULL,
                             `therapist_email_domain` varchar(100) NOT NULL,
                             `therapist_email_id` varchar(100) NOT NULL,
                             `therapist_id` varchar(100) NOT NULL,
                             `therapist_name` varchar(100) NOT NULL,
                             `therapist_password` varchar(100) NOT NULL,
                             `therapist_phone` varchar(100) NOT NULL,
                             `room_num` int DEFAULT NULL,
                             PRIMARY KEY (`num`),
                             KEY `FK1wnh7xieyotndjou8yghwatv7` (`room_num`),
                             CONSTRAINT `FK1wnh7xieyotndjou8yghwatv7` FOREIGN KEY (`room_num`) REFERENCES `class_room` (`num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `student` (
                           `num` int NOT NULL AUTO_INCREMENT,
                           `is_ongoing` bit(1) NOT NULL DEFAULT b'0',
                           `role` varchar(255) DEFAULT 'STUDENT',
                           `student_birth` datetime(6) NOT NULL,
                           `student_email_domain` varchar(100) NOT NULL,
                           `student_email_id` varchar(100) NOT NULL,
                           `student_id` varchar(100) NOT NULL,
                           `student_name` varchar(100) NOT NULL,
                           `student_name_helper` varchar(100) NOT NULL,
                           `student_password` varchar(100) NOT NULL,
                           `student_password_helper` varchar(100) NOT NULL,
                           `student_phone_helper` varchar(100) NOT NULL,
                           `therapist_num` int DEFAULT NULL,
                           PRIMARY KEY (`num`),
                           KEY `FKrvt4x7jk739l4vsullt6a7uaw` (`therapist_num`),
                           CONSTRAINT `FKrvt4x7jk739l4vsullt6a7uaw` FOREIGN KEY (`therapist_num`) REFERENCES `therapist` (`num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `evaluation` (
                              `num` int NOT NULL AUTO_INCREMENT,
                              `eval_achieve` int NOT NULL,
                              `eval_concentration` int NOT NULL,
                              `eval_date` datetime(6) DEFAULT NULL,
                              `eval_entire` int NOT NULL,
                              `student_num` int DEFAULT NULL,
                              PRIMARY KEY (`num`),
                              KEY `FKnqnhc7wn9iu5x0auld32mjkck` (`student_num`),
                              CONSTRAINT `FKnqnhc7wn9iu5x0auld32mjkck` FOREIGN KEY (`student_num`) REFERENCES `student` (`num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE `watch` (
                         `num` int NOT NULL AUTO_INCREMENT,
                         `difficulty` varchar(255) DEFAULT NULL,
                         `image_path` varchar(100) NOT NULL,
                         `voice_path` varchar(100) NOT NULL,
                         `watch_question` varchar(100) NOT NULL,
                         PRIMARY KEY (`num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `wordspeaking` (
                                `num` int NOT NULL AUTO_INCREMENT,
                                `difficulty` varchar(255) DEFAULT NULL,
                                `image_path` varchar(100) NOT NULL,
                                `voice_path` varchar(100) NOT NULL,
                                `word_speaking_question` varchar(100) NOT NULL,
                                PRIMARY KEY (`num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


insert into marmar.wordspeaking values (1, "high", "word/img/1.png", "12321312", "사과");
insert into marmar.wordspeaking values (2, "high", "word/img/2.png", "aa123", "aa123");
insert into marmar.wordspeaking values (3, "middle", "ㅠㅠ", "ㅠㅠ", "ㅠㅠ");
insert into marmar.wordspeaking values (4, "low", "ㅇㅇ", "ㅇㅇ", "ㅇㅇ");
insert into marmar.wordspeaking values (5, "high", "word/img/3.png", "aa", "aa");
insert into marmar.wordspeaking values (6, "high", "word/img/4.png", "aa123", "aa123");
insert into marmar.wordspeaking values (7, "middle", "ㅠㅠ1", "ㅠㅠ", "ㅠㅠ");
insert into marmar.wordspeaking values (8, "low", "ㅇㅇ1", "ㅇㅇ", "ㅇㅇ");
insert into marmar.wordspeaking values (9, "high", "aa2", "aa", "aa");
insert into marmar.wordspeaking values (10, "high", "aa1232", "aa123", "aa123");
insert into marmar.wordspeaking values (11, "middle", "ㅠㅠ2", "ㅠㅠ", "ㅠㅠ");
insert into marmar.wordspeaking values (12, "low", "ㅇㅇ2", "ㅇㅇ", "ㅇㅇ");
insert into marmar.wordspeaking values (13, "middle", "ㅠㅠ3", "ㅠㅠ", "ㅠㅠ");

insert into marmar.watch values (1, "high", "1시 33분", "aa", "aa");
insert into marmar.watch values (2, "high", "2시 34분", "aa123", "aa123");
insert into marmar.watch values (3, "middle", "ㅠㅠ", "ㅠㅠ", "ㅠㅠ");
insert into marmar.watch values (4, "low", "ㅇㅇ", "ㅇㅇ", "ㅇㅇ");
insert into marmar.watch values (5, "high", "aa1", "aa", "aa");
insert into marmar.watch values (6, "high", "aa1231", "aa123", "aa123");
insert into marmar.watch values (7, "middle", "ㅠㅠ1", "ㅠㅠ", "ㅠㅠ");
insert into marmar.watch values (8, "low", "ㅇㅇ1", "ㅇㅇ", "ㅇㅇ");
insert into marmar.watch values (9, "high", "aa2", "aa", "aa");
insert into marmar.watch values (10, "high", "aa1232", "aa123", "aa123");
insert into marmar.watch values (11, "middle", "ㅠㅠ2", "ㅠㅠ", "ㅠㅠ");
insert into marmar.watch values (12, "low", "ㅇㅇ2", "ㅇㅇ", "ㅇㅇ");
insert into marmar.watch values (13, "middle", "ㅠㅠ3", "ㅠㅠ", "ㅠㅠ");