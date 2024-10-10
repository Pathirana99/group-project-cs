package com.example.testing.service;

import com.example.testing.dto.SignInDto;
import com.example.testing.repo.SigninRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SignInService {
    @Autowired
    SigninRepo signinRepo;
    public SignInDto SignIn(SignInDto signInDto) {
        if(signinRepo.existsByEmail(signInDto.getEmail())) {

        }
        return null;
    }
}
