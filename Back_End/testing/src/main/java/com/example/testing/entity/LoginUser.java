package com.example.testing.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class LoginUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer contactNo;
    private String password;
    private String email;
    private String role;

    @OneToOne(mappedBy = "loginUser", cascade = CascadeType.ALL)
    private BoardingOwner boardingOwner;

    public LoginUser(Integer contactNo, String password, String email, String role) {
        this.contactNo = contactNo;
        this.password = password;
        this.email = email;
        this.role = role;
    }

    public LoginUser(Integer id, Integer contactNo, String password, String email) {
    }
}
