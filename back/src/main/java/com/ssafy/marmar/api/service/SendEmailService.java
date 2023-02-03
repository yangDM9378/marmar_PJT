package com.ssafy.marmar.api.service;

import com.ssafy.marmar.dto.MailDto;
import org.apache.commons.mail.EmailException;

public interface SendEmailService {
    MailDto createMailAndChangePassword(String userEmail, String userName, String role) throws Exception;
    void mailSend(MailDto mailDto) throws Exception;
}
