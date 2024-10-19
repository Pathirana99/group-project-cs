package com.example.testing.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity

public class BoardingOwner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String email;
    private String password;

    @OneToMany(mappedBy = "boardingOwner", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BoardingHouse> boardingHouses;

    public BoardingOwner(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
    public void addBoardingHouse(BoardingHouse boardingHouse) {
        boardingHouses.add(boardingHouse);
        boardingHouse.setBoardingOwner(this);
    }

    public void removeBoardingHouse(BoardingHouse boardingHouse) {
        boardingHouses.remove(boardingHouse);
        boardingHouse.setBoardingOwner(null);
    }
}
