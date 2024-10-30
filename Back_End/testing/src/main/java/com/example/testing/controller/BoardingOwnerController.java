package com.example.testing.controller;

import com.example.testing.dto.BoardingHouseDto;
import com.example.testing.dto.BoardingOwnerDto;
import com.example.testing.entity.BoardingOwner;
import com.example.testing.service.BoardingHouseService;
import com.example.testing.service.BoardingOwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/owner")
public class BoardingOwnerController {
    @Autowired
    BoardingOwnerService service;
    @Autowired
    BoardingHouseService houseService;


    @PostMapping("/saveOwnerWithHousesAndRooms")
    public ResponseEntity<BoardingOwner> saveOwnerWithHousesAndRooms(@RequestBody BoardingOwnerDto ownerDto) {
        BoardingOwner savedOwner = service.saveOwnerWithHousesAndRooms(ownerDto);
        return new ResponseEntity<>(savedOwner, HttpStatus.CREATED);
    }
    @GetMapping("/{ownerId}/houses")
    public List<BoardingHouseDto> getBoardingHousesByOwner(@PathVariable Integer ownerId) {
        return service.getBoardingHousesByOwner(ownerId);
    }
}