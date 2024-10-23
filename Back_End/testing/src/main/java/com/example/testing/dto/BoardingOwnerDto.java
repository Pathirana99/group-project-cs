package com.example.testing.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class BoardingOwnerDto {
    private Integer id;
    private String name;
    private String email;
    private String password;

    public BoardingOwnerDto(String email, Integer id) {
    }

}
