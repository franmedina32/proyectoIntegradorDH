package com.example.backendPIG6.repository;

public interface EmailRepository{
    void sendMail(String to, String subject, String body) throws Exception;
}
