package com.example.testing.service;

import com.example.testing.dto.BoardingHouseDto;
import com.example.testing.dto.BoardingOwnerDto;
import com.example.testing.dto.RoomDto;
import com.example.testing.entity.BoardingHouse;
import com.example.testing.entity.BoardingOwner;
import com.example.testing.entity.LoginUser;
import com.example.testing.entity.Room;
import com.example.testing.repo.BoardingHouseRepo;
import com.example.testing.repo.BoardingOwnerRepo;
import com.example.testing.repo.LoginUserRepo;
import com.example.testing.repo.RoomRepo;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service

public class BoardingOwnerService {

    @Autowired
    LoginUserRepo loginUserRepo;
    @Autowired
    BoardingOwnerRepo boardingOwnerRepo;
    @Autowired
    BoardingHouseRepo boardingHouseRepo;
    @Autowired
    RoomRepo roomRepo;

    @Transactional
    public BoardingOwner saveOwnerWithHousesAndRooms(Integer loginUserId, BoardingOwnerDto ownerDto) {
        // Step 1: Fetch LoginUser by ID
        LoginUser loginUser = loginUserRepo.findById(loginUserId)
                .orElseThrow(() -> new ResourceNotFoundException("LoginUser not found with ID: " + loginUserId));

        // Step 2: Save BoardingOwner and associate with LoginUser
        BoardingOwner boardingOwner = new BoardingOwner();
        boardingOwner.setName(ownerDto.getName());
        boardingOwner.setEmail(ownerDto.getEmail());
        boardingOwner.setPassword(ownerDto.getPassword());
        boardingOwner.setLoginUser(loginUser); // Assuming you have a setLoginUser method

        BoardingOwner savedOwner = boardingOwnerRepo.save(boardingOwner);

        // Step 3: Save BoardingHouses and associate with BoardingOwner
        for (BoardingHouseDto houseDto : ownerDto.getBoardingHouses()) {
            BoardingHouse boardingHouse = new BoardingHouse();
            boardingHouse.setTitle(houseDto.getTitle());
            boardingHouse.setType(houseDto.getType());
            boardingHouse.setPhone(houseDto.getPhone());
            boardingHouse.setLocation(houseDto.getLocation());
            boardingHouse.setDescription(houseDto.getDescription());
            boardingHouse.setCity(houseDto.getCity());
            boardingHouse.setStreet(houseDto.getStreet());
            boardingHouse.setPrice(houseDto.getPrice());
            boardingHouse.setEmail(houseDto.getEmail());
            boardingHouse.setBoardingOwner(savedOwner);

            BoardingHouse savedHouse = boardingHouseRepo.save(boardingHouse);

            // Step 4: Save Rooms and associate with BoardingHouse
            for (RoomDto roomDto : houseDto.getRooms()) {
                Room room = new Room();
                room.setTitle(roomDto.getTitle());
                room.setCapacity(roomDto.getCapacity());
                room.setIsavailable(roomDto.getIsavailable());
                room.setBoardingHouse(savedHouse);

                roomRepo.save(room);
            }
        }
        return savedOwner;
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
