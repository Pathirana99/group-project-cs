package com.example.testing.repo;

import com.example.testing.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepo extends JpaRepository<Contact, Integer> {
}
