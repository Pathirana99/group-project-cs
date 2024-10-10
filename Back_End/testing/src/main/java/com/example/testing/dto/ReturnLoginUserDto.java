package com.example.testing.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class ReturnLoginUserDto {
    private String email;
    private Integer id;

}
