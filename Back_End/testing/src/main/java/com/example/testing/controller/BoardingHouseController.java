package com.example.testing.controller;

import com.example.testing.dto.BoardingHouseDto;
import com.example.testing.service.BoardingHouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/boardingHouse")
public class BoardingHouseController {
    @Autowired
    BoardingHouseService service;

    @PostMapping("/saveBoarding")
    public ResponseEntity<Object> saveBoarding(@RequestBody BoardingHouseDto boardingHouseDto){
        BoardingHouseDto save = service.saveBoarding(boardingHouseDto);
        if (save != null) {
            return new ResponseEntity<>("Register Success", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Already regitered with this Email", HttpStatus.CREATED);
        }
    }

}
