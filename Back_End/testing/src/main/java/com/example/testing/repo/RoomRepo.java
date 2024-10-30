package com.example.testing.repo;

import com.example.testing.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepo extends JpaRepository<Room, Integer> {
}
