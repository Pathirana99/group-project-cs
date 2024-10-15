package com.example.testing.service;

import com.example.testing.dto.BoardingHouseDto;
import com.example.testing.entity.BoardingHouse;
import com.example.testing.repo.BoardingHouseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service
public class BoardingHouseService {
    @Autowired
    BoardingHouseRepo boardingHouseRepo;

    public BoardingHouseDto saveBoarding(BoardingHouseDto boardingHouseDto) {
        String encodedPassword = Base64.getEncoder().encodeToString(boardingHouseDto.getPassword().getBytes());

        if (boardingHouseRepo.existsByEmail(boardingHouseDto.getEmail())) {
            return null;
        }
        BoardingHouse save = boardingHouseRepo.save(new BoardingHouse(boardingHouseDto.getCity(), boardingHouseDto.getType(), boardingHouseDto.getPhone(), boardingHouseDto.getLocation(), boardingHouseDto.getDescription(), boardingHouseDto.getEmail(), boardingHouseDto.getCity(), boardingHouseDto.getPrice(), boardingHouseDto.getStreet(), boardingHouseDto.getOwnername(), boardingHouseDto.getImage(), encodedPassword));
        return new BoardingHouseDto(save.getEmail(), save.getId());
    }

    public BoardingHouseDto updateBoarding(Integer id, BoardingHouseDto boardingHouseDto) {
        if (boardingHouseRepo.existsById(id)) {
            BoardingHouse update = boardingHouseRepo.save(new BoardingHouse(id, boardingHouseDto.getCity(), boardingHouseDto.getType(), boardingHouseDto.getPhone(), boardingHouseDto.getLocation(), boardingHouseDto.getDescription(), boardingHouseDto.getEmail(), boardingHouseDto.getCity(), boardingHouseDto.getPrice(), boardingHouseDto.getStreet(), boardingHouseDto.getOwnername(), boardingHouseDto.getImage(), boardingHouseDto.getPassword()));
            return new BoardingHouseDto(boardingHouseDto.getId(), boardingHouseDto.getCity(), boardingHouseDto.getType(), boardingHouseDto.getPhone(), boardingHouseDto.getLocation(), boardingHouseDto.getDescription(), boardingHouseDto.getEmail(), boardingHouseDto.getCity(), boardingHouseDto.getPrice(), boardingHouseDto.getStreet(), boardingHouseDto.getOwnername(), boardingHouseDto.getImage(), boardingHouseDto.getPassword());
        }
        return null;
    }

    public List<BoardingHouseDto> getAllBoarding() {
        List<BoardingHouse> all = boardingHouseRepo.findAll();
        List<BoardingHouseDto> boardingHouseDtos = new ArrayList<>();

        for (BoardingHouse boardingHouse : all) {
            boardingHouseDtos.add(new BoardingHouseDto(boardingHouse.getId(), boardingHouse.getCity(), boardingHouse.getType(), boardingHouse.getPhone(), boardingHouse.getLocation(), boardingHouse.getDescription(), boardingHouse.getEmail(), boardingHouse.getCity(), boardingHouse.getPrice(), boardingHouse.getStreet(), boardingHouse.getOwnername(), boardingHouse.getImage(), boardingHouse.getPassword()));
        }
        return boardingHouseDtos;
    }

    public int deleteBoarding(Integer id) {
        if (boardingHouseRepo.existsById(id)) {
            boardingHouseRepo.deleteById(id);
            return 1;
        }
        return 0;
    }
    /*
    public List<BoardingHouse> searchLocation(String location) {
        return boardingHouseRepo.searchByLocation(location);
    }
 */
}
