package com.example.testing.dto;

public class SigninResponseDto {
    private String email;
    private String msg;

    public SigninResponseDto(String email, String msg) {
        this.email = email;
        this.msg = msg;
    }
    public String getEmail() {return email;}

    public String getMsg() {return msg;}

    public void setEmail(String email) {
        this.email = email;
    }
    public void setMsg(String msg) {
        this.msg = msg;
    }
}
