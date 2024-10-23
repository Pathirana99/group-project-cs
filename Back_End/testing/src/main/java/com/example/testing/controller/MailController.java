package com.example.testing.controller;

import com.example.testing.dto.MailDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mail")
public class MailController {
    @Autowired
    private JavaMailSender mailSender;

    @PostMapping("/send")
    public String sendEmail(@RequestBody MailDto mailDto){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setSubject(mailDto.getSubject());
        message.setTo(mailDto.getTomail());
        message.setFrom("sunithkaushalya.pp@gmail.com");
        message.setText(mailDto.getMessage());

        mailSender.send(message);
        return "Email sent";
    }
}
