package com.example.testing.service;

import com.example.testing.dto.BoardingHouseDto;
import com.example.testing.dto.BoardingOwnerDto;
import com.example.testing.entity.BoardingHouse;
import com.example.testing.entity.BoardingOwner;
import com.example.testing.repo.BoardingHouseRepo;
import com.example.testing.repo.BoardingOwnerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service

public class BoardingOwnerService {

    @Autowired
    BoardingOwnerRepo boardingOwnerRepo;
    @Autowired
    BoardingHouseRepo boardingHouseRepo;

    public BoardingOwnerDto saveBoardingOwner(BoardingOwnerDto boardingOwnerDTO) {
        BoardingOwner boardingOwner = new BoardingOwner();
        boardingOwner.setEmail(boardingOwnerDTO.getEmail());
        boardingOwner.setName(boardingOwnerDTO.getName());
        boardingOwner.setPassword(boardingOwnerDTO.getPassword());
        boardingOwner = boardingOwnerRepo.save(boardingOwner);
        boardingOwnerDTO.setId(boardingOwner.getId());
        return boardingOwnerDTO;
    }
    public List<BoardingHouseDto> getBoardingHousesByOwner(Integer ownerId) {
        List<BoardingHouse> boardingHouses = boardingHouseRepo.findByBoardingOwnerId(ownerId);
        return boardingHouses.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    private BoardingHouseDto convertToDto(BoardingHouse boardingHouse) {
        BoardingHouseDto dto = new BoardingHouseDto();
        dto.setId(boardingHouse.getId());
        dto.setTitle(boardingHouse.getTitle());
        dto.setType(boardingHouse.getType());
        dto.setPhone(boardingHouse.getPhone());
        dto.setLocation(boardingHouse.getLocation());
        dto.setDescription(boardingHouse.getDescription());
        dto.setCity(boardingHouse.getCity());
        dto.setStreet(boardingHouse.getStreet());
        dto.setPrice(boardingHouse.getPrice());
        dto.setEmail(boardingHouse.getEmail());
        return dto;
    }
}
