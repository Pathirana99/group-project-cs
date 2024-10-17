package com.example.testing.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class MailDto {
    private String tomail;
    private String message;
    public String subject;
    public String body;
    private Integer id;

}
