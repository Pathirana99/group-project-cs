package com.example.testing.service;

import com.example.testing.dto.BoardingHouseDto;
import com.example.testing.entity.BoardingHouse;
import com.example.testing.repo.BoardingHouseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Base64;

@Service
public class BoardingHouseService {
    @Autowired
    BoardingHouseRepo boardingHouseRepo;
    public BoardingHouseDto saveBoarding(BoardingHouseDto boardingHouseDto){
        String encodedPassword = Base64.getEncoder().encodeToString(boardingHouseDto.getPassword().getBytes());

        if(boardingHouseRepo.existsByEmail(boardingHouseDto.getEmail())) {
            return null;
        }
        BoardingHouse save = boardingHouseRepo.save(new BoardingHouse(boardingHouseDto.getCity(), boardingHouseDto.getType(), boardingHouseDto.getPhone(), boardingHouseDto.getLocation(), boardingHouseDto.getDescription(), boardingHouseDto.getEmail(), boardingHouseDto.getCity(), boardingHouseDto.getPrice(), boardingHouseDto.getStreet(), boardingHouseDto.getOwnername(), boardingHouseDto.getImage(), encodedPassword));
        return new BoardingHouseDto(save.getEmail(), save.getId());
    }

}
