package com.example.testing.controller;

import com.example.testing.dto.ReturnLoginUserDto;
import com.example.testing.dto.SignInDto;
import com.example.testing.dto.SigninResponseDto;
import com.example.testing.service.SignInService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/SignInUser")
public class SignInController {
    @Autowired
    SignInService signInService;

    @PostMapping("/SignIn")
    public ResponseEntity<SigninResponseDto> SignIn(@RequestBody SignInDto signInDto){
        SigninResponseDto signIn = signInService.SignIn(signInDto);
        return new ResponseEntity<>(signIn, HttpStatus.OK);
    }
}
