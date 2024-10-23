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
    private Integer price;
    private String image;

    private String email;

    public BoardingHouseDto(String email, Integer id) {
    }

    public BoardingHouseDto(Integer id, String city, String type,
                            String phone, String location, String description,
                            String email, Integer price, String street, String image) {
    }
}
