package com.example.testing.controller;

import com.example.testing.dto.BoardingHouseDto;
import com.example.testing.dto.BoardingOwnerDto;
import com.example.testing.service.BoardingOwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/owner")
public class BoardingOwnerController {
    @Autowired
    BoardingOwnerService service;

    @PostMapping("/saveOwner")
    public BoardingOwnerDto createBoardingOwner(@RequestBody BoardingOwnerDto boardingOwnerDto) {
        return service.saveBoardingOwner(boardingOwnerDto);
    }
    @GetMapping("/{ownerId}/houses")
    public List<BoardingHouseDto> getBoardingHousesByOwner(@PathVariable Integer ownerId) {
        return service.getBoardingHousesByOwner(ownerId);
    }
}