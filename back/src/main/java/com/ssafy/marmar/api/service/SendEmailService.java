package com.ssafy.marmar.api.service;

import com.ssafy.marmar.dto.MailDto;

public interface SendEmailService {
    MailDto createMailAndChangePassword(String userEmail, String userName, String role) throws Exception;
    String mailSend(MailDto mailDto) throws Exception;
}
