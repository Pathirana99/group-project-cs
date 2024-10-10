package com.example.testing.service;

import com.example.testing.dto.ReturnLoginUserDto;
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
        Optional<LoginUser> loginUserByEmail = signinRepo.getLoginUserByEmail(signInDto.getEmail());
        if(loginUserByEmail.isPresent()) {
            LoginUser loginUser = loginUserByEmail.get();
            byte[] decodedBytes = Base64.getDecoder().decode(loginUser.getPassword());

            String decodedpassword = new String(decodedBytes);

            if(decodedpassword.equals(signInDto.getPassword())) {
                return new SignInDto(loginUser.getEmail(),"Login Success");
            }else {
                return new SignInDto(loginUser.getEmail(), "Login Failed1 !");
            }
        }else {
            return new SignInDto(signInDto.getEmail(), "Login Failed2 !");
        }
    }
}
