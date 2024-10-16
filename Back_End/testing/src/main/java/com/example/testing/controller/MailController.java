package com.example.testing.controller;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Mail")
public class MailController {

    public String sendEmail(@RequestBody) {

    }

}
