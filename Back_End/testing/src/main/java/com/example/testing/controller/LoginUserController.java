package com.example.testing.controller;

import com.example.testing.dto.LoginUserDto;
import com.example.testing.dto.ReturnLoginUserDto;
import com.example.testing.service.LoginUserService;
import com.example.testing.utill.JWTAuthenticator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/loginuser")
public class LoginUserController {
    @Autowired
    LoginUserService service;

    @Autowired
    JWTAuthenticator jwtAuthenticator;

    @PostMapping("/saveLoginUser")
    public ResponseEntity<Object> saveLoginUser(@RequestBody LoginUserDto loginUserDto){
                ReturnLoginUserDto returnLoginUserDto = service.saveLoginUser(loginUserDto);
                if (returnLoginUserDto != null) {
                    return new ResponseEntity<>("Register Success", HttpStatus.OK);
                } else {
                    return new ResponseEntity<>("Already regitered with this Email", HttpStatus.CREATED);
                }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateLoginUser(@PathVariable Integer id, @RequestBody LoginUserDto loginuser){
       LoginUserDto update = service.updateLoginUser(id, loginuser);
        if(update != null) {
            return new ResponseEntity<>(loginuser, HttpStatus.OK);
        }
        return new ResponseEntity<>("not found", HttpStatus.NOT_FOUND);
    }
    @GetMapping("/getAllLoginuser")
    public ResponseEntity<List<LoginUserDto>> getAllLoginUser(){
        List<LoginUserDto> allLoginUser = service.getAllLoginUser();
        return new ResponseEntity<>(allLoginUser, HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Object> getLoginUserById(@PathVariable Integer id) {
        LoginUserDto loginUserDto = service.getLoginUserById(id);
        if (loginUserDto != null) {
            return new ResponseEntity<>(loginUserDto, HttpStatus.OK);
        }
        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteLoginUser(@PathVariable Integer id){
        int i = service.deleteLoginUser(id);
        if (i == 1){
            return new ResponseEntity<>("deleted", HttpStatus.OK);
        }
        return new ResponseEntity<>("not found", HttpStatus.NOT_FOUND);
    }
}
