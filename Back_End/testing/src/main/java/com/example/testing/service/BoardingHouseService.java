package com.example.testing.service;

import com.example.testing.dto.BoardingHouseDto;
import com.example.testing.entity.BoardingHouse;
import com.example.testing.entity.BoardingOwner;
import com.example.testing.repo.BoardingHouseRepo;
import com.example.testing.repo.BoardingOwnerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BoardingHouseService {
    @Autowired
    BoardingHouseRepo boardingHouseRepo;

    @Autowired
    BoardingOwnerRepo boardingOwnerRepo;

    public BoardingHouseDto saveBoardingHouse(BoardingHouseDto boardingHouseDTO, Integer ownerId) {
        BoardingOwner boardingOwner = boardingOwnerRepo.findById(ownerId)
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        BoardingHouse boardingHouse = new BoardingHouse();
        boardingHouse.setTitle(boardingHouseDTO.getTitle());
        boardingHouse.setType(boardingHouseDTO.getType());
        boardingHouse.setPhone(boardingHouseDTO.getPhone());
        boardingHouse.setLocation(boardingHouseDTO.getLocation());
        boardingHouse.setDescription(boardingHouseDTO.getDescription());
        boardingHouse.setCity(boardingHouseDTO.getCity());
        boardingHouse.setStreet(boardingHouseDTO.getStreet());
        boardingHouse.setPrice(boardingHouseDTO.getPrice());
        boardingHouse.setBoardingOwner(boardingOwner);

        boardingHouse = boardingHouseRepo.save(boardingHouse);
        boardingHouseDTO.setId(boardingHouse.getId());
        return boardingHouseDTO;
    }
    public List<BoardingHouseDto> getBoardingHousesByCity(String city) {
        List<BoardingHouse> boardingHouses = boardingHouseRepo.findByCity(city);
        return boardingHouses.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public List<BoardingHouseDto> getAllBoardingHouses() {
       List<BoardingHouse> boardingHouses = boardingHouseRepo.findAll();
        return boardingHouses.stream().map(this::convertToDto).collect(Collectors.toList());
    }
    public BoardingHouseDto updateBoarding(Integer id, BoardingHouseDto boardingHouseDto) {
        Optional<BoardingHouse> existingBoardingHouse = boardingHouseRepo.findById(id);

        if (existingBoardingHouse.isPresent()) {
            BoardingHouse boardingHouse = existingBoardingHouse.get();

            // Update fields
            boardingHouse.setCity(boardingHouseDto.getCity());
            boardingHouse.setType(boardingHouseDto.getType());
            boardingHouse.setPhone(boardingHouseDto.getPhone());
            boardingHouse.setLocation(boardingHouseDto.getLocation());
            boardingHouse.setDescription(boardingHouseDto.getDescription());
            boardingHouse.setEmail(boardingHouseDto.getEmail());
            boardingHouse.setPrice(boardingHouseDto.getPrice());
            boardingHouse.setStreet(boardingHouseDto.getStreet());
            boardingHouse.setImage(boardingHouseDto.getImage());

            // Save updated BoardingHouse entity
            BoardingHouse updatedBoardingHouse = boardingHouseRepo.save(boardingHouse);

            // Convert the updated entity to DTO
            return new BoardingHouseDto(
                    updatedBoardingHouse.getId(),
                    updatedBoardingHouse.getCity(),
                    updatedBoardingHouse.getType(),
                    updatedBoardingHouse.getPhone(),
                    updatedBoardingHouse.getLocation(),
                    updatedBoardingHouse.getDescription(),
                    updatedBoardingHouse.getEmail(),
                    updatedBoardingHouse.getPrice(),
                    updatedBoardingHouse.getStreet(),
                    String.valueOf(updatedBoardingHouse.getImage())
            );
        }
        return null; // Return null if not found
    }
/*
    public List<BoardingHouseDto> getAllBoarding() {
        List<BoardingHouse> all = boardingHouseRepo.findAll();
        List<BoardingHouseDto> boardingHouseDtos = new ArrayList<>();

        for (BoardingHouse boardingHouse : all) {
            boardingHouseDtos.add(new BoardingHouseDto(boardingHouse.getId(), boardingHouse.getCity(), boardingHouse.getType(), boardingHouse.getPhone(), boardingHouse.getLocation(), boardingHouse.getDescription(), boardingHouse.getEmail(),boardingHouse.getPrice(), boardingHouse.getStreet()));
        }
        return boardingHouseDtos;
    }


 */
    public int deleteBoarding(Integer id) {
        if (boardingHouseRepo.existsById(id)) {
            boardingHouseRepo.deleteById(id);
            return 1;
        }
        return 0;
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
