package com.example.testing.repo;

import com.example.testing.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ContactRepo extends JpaRepository<Contact, Integer> {
    Optional<Contact> getContactById(Integer id);
}
