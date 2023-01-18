package com.ssafy.marmar.api.service;

import com.ssafy.marmar.api.request.RegisterPostRes;
import com.ssafy.marmar.db.model.Student;

public interface StudentService {

    Student createUser(RegisterPostRes registInfo);
}
