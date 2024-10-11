package com.example.testing.service;

import com.example.testing.dto.SignInDto;
import com.example.testing.dto.SigninResponseDto;
import com.example.testing.entity.LoginUser;
import com.example.testing.repo.SigninRepo;
import com.example.testing.utill.JWTAuthenticator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.Optional;

@Service
public class SignInService {
    @Autowired
    SigninRepo signinRepo;

    @Autowired
    JWTAuthenticator jwtAuthenticator;

    public SigninResponseDto SignIn(SignInDto signInDto) {
        Optional<LoginUser> loginUserByEmail = signinRepo.getLoginUserByEmail(signInDto.getEmail());
        if(loginUserByEmail.isPresent()) {
            LoginUser loginUser = loginUserByEmail.get();
            byte[] decodedBytes = Base64.getDecoder().decode(loginUser.getPassword());

            String decodedpassword = new String(decodedBytes);

            if(decodedpassword.equals(signInDto.getPassword())) {
               // String token = jwtAuthenticator.generateJwtToken(loginUser);
                return new SigninResponseDto(loginUser.getEmail(),"LOGIN SUCCESS");
            }else {
                return new SigninResponseDto(loginUser.getEmail(), "WRONG PASSWORD");
            }
        }else {
            return new SigninResponseDto(signInDto.getEmail(), "NO USER FOUND");
        }
    }
}
