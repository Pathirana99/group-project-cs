package com.example.testing.repo;

import com.example.testing.entity.BoardingHouse;
import com.example.testing.entity.BoardingOwner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardingOwnerRepo extends JpaRepository<BoardingOwner, Integer> {
    boolean existsByEmail(String email);
}
