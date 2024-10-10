package com.example.testing.service;

import com.example.testing.dto.SignInDto;
import com.example.testing.entity.LoginUser;
import com.example.testing.repo.SigninRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.Optional;

@Service
public class SignInService {
    @Autowired
    SigninRepo signinRepo;
    public SignInDto SignIn(SignInDto signInDto) {
        Optional<LoginUser> loginUserByEmail = signinRepo.findByEmail(signInDto.getEmail());
        if(loginUserByEmail.isPresent()) {
            LoginUser loginUser = loginUserByEmail.get();
            byte[] decodedBytes = Base64.getDecoder().decode(signInDto.getPassword());

            String decodedpassword = new String(decodedBytes);

            if(decodedpassword.equals(signInDto.getPassword())) {
                return new SignInDto(loginUser.getEmail(), "Login Succes !");
            }else {
                return new SignInDto(loginUser.getEmail(), "Login Failed !");
            }
        }
        return new SignInDto(loginUserByEmail.get().getEmail(), "Login Failed !");
    }
}
