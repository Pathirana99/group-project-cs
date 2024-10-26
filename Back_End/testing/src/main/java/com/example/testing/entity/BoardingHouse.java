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
public class BoardingHouse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;
    private String type;
    private String phone;
    private String location;
    private String description;
    private String city;
    private String street;
    private Integer price;
    private String email;

    @ManyToOne
    @JoinColumn(name = "boarding_owner_id", nullable = false)
    private BoardingOwner boardingOwner;

    @OneToMany(mappedBy = "boardingHouse", cascade = CascadeType.ALL)
    private List<Room> rooms;

    public BoardingHouse(String city, String type, String phone, String location, String description, String email, Integer price, String street,  String image) {
        this.city = city;
        this.type = type;
        this.phone = phone;
        this.location = location;
        this.description = description;
        this.email = email;
        this.price = price;
        this.street = street;
    }

    public BoardingHouse(Integer id, String city, String type, String phone, String location,
                         String description, String email, Integer price, String street, String image) {
    }
    public BoardingHouse(String city, String type, String phone, String location, String description,
                         String email, Integer price, String street, String image, BoardingOwner boardingOwner) {
        this.city = city;
        this.type = type;
        this.phone = phone;
        this.location = location;
        this.description = description;
        this.email = email;
        this.price = price;
        this.street = street;
        this.boardingOwner = boardingOwner; // Set the boarding owner
    }

    public BoardingHouse(String city, String type, String phone, String location, String description, String email, Integer price, String street) {
    }

    public BoardingHouse(String city, String type, String phone, String location, String description, String email, Integer price, String street, BoardingOwner boardingOwner) {
    }
}
