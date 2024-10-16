package com.example.testing.repo;

import com.example.testing.entity.BoardingHouse;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BoardingHouseRepo extends JpaRepository<BoardingHouse, Integer> {
    boolean existsByEmail(String email);
    List<BoardingHouse> findByCity(String city);
}
