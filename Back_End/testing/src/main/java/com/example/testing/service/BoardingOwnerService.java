package com.example.testing.service;

import com.example.testing.repo.BoardingOwnerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service

public class BoardingOwnerService {
    @Autowired
    BoardingOwnerRepo boardingOwnerRepo;

}
