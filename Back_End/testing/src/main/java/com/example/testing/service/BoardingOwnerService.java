package com.example.testing.service;

import com.example.testing.dto.BoardingHouseDto;
import com.example.testing.dto.BoardingOwnerDto;
import com.example.testing.entity.BoardingHouse;
import com.example.testing.entity.BoardingOwner;
import com.example.testing.repo.BoardingOwnerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Base64;

@Service

public class BoardingOwnerService {
    @Autowired
    BoardingOwnerRepo boardingOwnerRepo;
    public BoardingOwnerDto saveBoardingOwner(BoardingOwnerDto boardingOwnerDto) {
        String encodedPassword = Base64.getEncoder().encodeToString(boardingOwnerDto.getPassword().getBytes());

        if (boardingOwnerRepo.existsByEmail(boardingOwnerDto.getEmail())) {
            return null;
        }
        BoardingOwner save = boardingOwnerRepo.save(new BoardingOwner(boardingOwnerDto.getName(), boardingOwnerDto.getEmail(), encodedPassword));
        return new BoardingOwnerDto(save.getEmail(), save.getId());
    }
}
