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

    @PostMapping("/{ownerId}/houses")
    public BoardingHouseDto createBoardingHouse(@PathVariable Integer ownerId, @RequestBody BoardingHouseDto boardingHouseDto) {
        return service.saveBoardingHouse(boardingHouseDto, ownerId);
    }
    @GetMapping("/city/{city}")
    public List<BoardingHouseDto> getBoardingHousesByCity(@PathVariable String city) {
        return service.getBoardingHousesByCity(city);
    }
    @GetMapping("/getAllBoarding")
    public List<BoardingHouseDto> getAllBoardingHouses() {
        return service.getAllBoardingHouses();
    }
    @PutMapping("/{id}/updateBoarding")
    public ResponseEntity<Object> updateBoarding(@PathVariable Integer id, @RequestBody BoardingHouseDto boardingHouseDto) {
        BoardingHouseDto updatedBoardingHouseDto = service.updateBoarding(id, boardingHouseDto);

        if (updatedBoardingHouseDto != null) {
            return new ResponseEntity<>(updatedBoardingHouseDto, HttpStatus.OK);
        }
        return new ResponseEntity<>("Boarding House not found", HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBoarding(@PathVariable Integer id){
        int i = service.deleteBoarding(id);
        if (i == 1){
            return new ResponseEntity<>("deleted", HttpStatus.OK);
        }
        return new ResponseEntity<>("not found", HttpStatus.NOT_FOUND);
    }
}
