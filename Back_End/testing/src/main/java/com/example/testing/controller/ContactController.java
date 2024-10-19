package com.example.testing.controller;

import com.example.testing.dto.ContactDto;
import com.example.testing.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/contact")
public class ContactController {
    @Autowired
    ContactService service;

    @PostMapping("/saveMessage")
    public ResponseEntity saveMessage(@RequestBody ContactDto contactDto) {
        service.saveMessage(contactDto);
        return new ResponseEntity<>("save sucess", HttpStatus.OK);
    }
}
