package com.ssafy.marmar.api.service;

import com.ssafy.marmar.api.request.StudentRegisterPostRes;
import com.ssafy.marmar.db.model.Student;

public interface StudentService {

    Student createUser(StudentRegisterPostRes registInfo);
}
