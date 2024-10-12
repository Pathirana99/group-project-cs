package com.example.testing.dto;

public class SigninResponseDto {
    private String email;
    private String msg;
    private String token;

    public SigninResponseDto(String email, String msg, String token) {
        this.email = email;
        this.msg = msg;
        this.setToken(token);
    }
    public String getEmail() {return email;}

    public String getMsg() {return msg;}

    public void setEmail(String email) {
        this.email = email;
    }
    public void setMsg(String msg) {
        this.msg = msg;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
