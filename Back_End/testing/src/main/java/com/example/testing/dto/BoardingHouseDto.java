package com.example.testing.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

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
    private List<RoomDto> rooms;

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
