package com.example.testing.repo;

import com.example.testing.entity.LoginUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SigninRepo extends JpaRepository<LoginUser, Integer> {
    Optional<LoginUser> getLoginUserByEmail(String email);

    LoginUser findByEmail(String email);
}
