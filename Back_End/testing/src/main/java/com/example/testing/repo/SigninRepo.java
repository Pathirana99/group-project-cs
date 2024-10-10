package com.example.testing.repo;

import com.example.testing.entity.LoginUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SigninRepo extends JpaRepository<LoginUser, Integer> {
    boolean existsByEmail(String email);
}
