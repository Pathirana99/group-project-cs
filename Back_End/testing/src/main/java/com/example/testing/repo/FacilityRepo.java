package com.example.testing.repo;

import com.example.testing.entity.Facility;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FacilityRepo extends JpaRepository<Facility, Integer> {
}
