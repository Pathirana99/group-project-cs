package com.example.testing.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class BoardingHouseDto {
    private Integer id;
    private String title;
    private String type;
    private String phone;
    private String location;
    private String description;
    private String city;
    private String street;
    private Double price;
    private String image;
    private String email;

    public BoardingHouseDto(Integer id, String title, String type, String phone, String location, String description, String city, String street, Integer price) {
    }

    public BoardingHouseDto(Integer id, String city, String type, String phone, String location, String description, String email, String city1, Integer price, String street) {
    }

    public BoardingHouseDto(Integer id, String city, String type, String phone, String location, String description, String email, Integer price, String street) {
    }

    public BoardingHouseDto(Integer id, String city, String type, String phone, String location, String description, String email, Integer price, String street, Object image) {
    }
    public BoardingHouseDto(Integer id, String city, String type, String phone, String location,
                            String description, String email, Double price, String street, String image) {
        this.id = id;
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

}
