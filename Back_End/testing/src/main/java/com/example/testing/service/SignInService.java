package com.example.testing.service;

import com.example.testing.entity.LoginUser;
import com.example.testing.repo.SigninRepo;
import com.example.testing.utill.JWTAuthenticator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class SignInService implements UserDetailsService {
    @Autowired
    SigninRepo signinRepo;

/*
    public SigninResponseDto SignIn(SignInDto signInDto) {
        Optional<LoginUser> loginUserByEmail = signinRepo.getLoginUserByEmail(signInDto.getEmail());
        if(loginUserByEmail.isPresent()) {
            LoginUser loginUser = loginUserByEmail.get();
            byte[] decodedBytes = Base64.getDecoder().decode(loginUser.getPassword());

            String decodedpassword = new String(decodedBytes);

            if(decodedpassword.equals(signInDto.getPassword())) {
                String token = jwtAuthenticator.generateJwtToken(loginUser);

                return new SigninResponseDto(loginUser.getEmail(),"LOGIN SUCCESS", token);
            }else {
                return new SigninResponseDto(loginUser.getEmail(), "WRONG PASSWORD", null);
            }
        }else {
            return new SigninResponseDto(signInDto.getEmail(), "NO USER FOUND", null);
        }
    }

public LoginUser findByEmail(String email) {
    return signinRepo.findByEmail(email);
}

    // Get all users
    public List<LoginUser> getAllUsers() {
        return signinRepo.findAll();
    }

    public UserDetails loadUserByEmail(String email) throws UsernameNotFoundException {
        LoginUser user = signinRepo.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with email: ");
        }
        return (UserDetails) new LoginUser(user.getEmail(), user.getPassword(), Collections.emptyList().toString());
        /*
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + user.getRole().toUpperCase()));
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);


    }


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return null;
    }
 */
public LoginUser findByEmail(String email) {
    return signinRepo.findByEmail(email);
}

    // Get all users
    public List<LoginUser> getAllUsers() {
        return signinRepo.findAll();
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        LoginUser user = signinRepo.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }

        List<GrantedAuthority> authorities = Collections.singletonList(
                new SimpleGrantedAuthority("ROLE_" + user.getRole().toUpperCase())
        );

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword()) // Stored BCrypt encoded password
                .authorities(authorities)
                .build();
    }
}
