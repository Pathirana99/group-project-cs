package com.example.testing.controller;

import com.example.testing.dto.BoardingHouseDto;
import com.example.testing.entity.BoardingHouse;
import com.example.testing.service.BoardingHouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateBoarding(@PathVariable Integer id, @RequestBody BoardingHouseDto boardingHouseDto){
        BoardingHouseDto update = service.updateBoarding(id, boardingHouseDto);
        if(update != null) {
            return new ResponseEntity<>(boardingHouseDto, HttpStatus.OK);
        }
        return new ResponseEntity<>("not found", HttpStatus.NOT_FOUND);
    }
    @GetMapping("/getAllBoarding")
    public ResponseEntity<List<BoardingHouseDto>> getAllBoarding(){
        List<BoardingHouseDto> allBoardign = service.getAllBoarding();
        return new ResponseEntity<>(allBoardign, HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBoarding(@PathVariable Integer id){
        int i = service.deleteBoarding(id);
        if (i == 1){
            return new ResponseEntity<>("deleted", HttpStatus.OK);
        }
        return new ResponseEntity<>("not found", HttpStatus.NOT_FOUND);
    }
    /*
    @GetMapping("/{location}")
    public ResponseEntity<List<BoardingHouse>> searchLocation(@RequestParam String location){
        List<BoardingHouse> boardingHouses = service.searchLocation(location);
        return new ResponseEntity<>(boardingHouses, HttpStatus.OK);
    }
    
     */
}
