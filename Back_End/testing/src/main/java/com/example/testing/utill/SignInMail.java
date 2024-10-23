package com.example.testing.utill;

import com.example.testing.dto.LoginUserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;

@Component
public class SignInMail {

    @Autowired
    private JavaMailSender mailSender;

    public String sendEmail(@RequestBody LoginUserDto loginUserDto){
        SimpleMailMessage signMessage = new SimpleMailMessage();
        signMessage.setSubject("LOGIN SUCSEES");
        signMessage.setTo(loginUserDto.getEmail());
        signMessage.setFrom("sunithkaushalya.pp@gmail.com");
        signMessage.setText("Congratulations! You have successfully logged in for Bdoor ");

        mailSender.send(signMessage);
        return "Email sent";
    }
}