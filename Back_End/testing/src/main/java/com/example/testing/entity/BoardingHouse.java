package com.example.testing.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private String image;
    private String email;
    public BoardingHouse(String city, String type, String phone, String location, String description, String email, Integer price, String street,  String image) {
        this.city = city;
        this.type = type;
        this.phone = phone;
        this.location = location;
        this.description = description;
        this.email = email;
        this.price = price;
        this.street = street;

        this.image = image;


    }

    public BoardingHouse(Integer id, String city, String type, String phone, String location,
                         String description, String email, Integer price, String street, String image) {
    }
}
