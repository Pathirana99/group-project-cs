package com.example.testing.repo;

import com.example.testing.entity.BoardingHouse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardingHouseRepo extends JpaRepository<BoardingHouse, Integer> {
    boolean existsByEmail(String email);
}
