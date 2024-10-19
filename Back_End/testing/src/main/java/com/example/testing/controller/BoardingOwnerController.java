package com.example.testing.controller;

import com.example.testing.dto.BoardingHouseDto;
import com.example.testing.dto.BoardingOwnerDto;
import com.example.testing.service.BoardingOwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/owner")
public class BoardingOwnerController {
    @Autowired
    BoardingOwnerService service;

    @PostMapping("/saveOwner")
    public ResponseEntity<Object> saveBoardingOwner(@RequestBody BoardingOwnerDto boardingOwnerDto){
        BoardingOwnerDto save = service.saveBoardingOwner(boardingOwnerDto);
        if (save != null) {
            return new ResponseEntity<>("Register Success", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Already regitered with this Email", HttpStatus.CREATED);
        }
    }
}
