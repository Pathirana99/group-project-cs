package com.example.testing.utill;

import com.example.testing.entity.LoginUser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component

public class JWTAuthenticator {
    private final String jwtSecret = "5VQX/LvxKH1AKIl5ztx4072LjwNozi1hBG6Ul/1RVjA=";
    private final int jwtExpirationMs = 86400000;

    public String generateJwtToken(LoginUser loginUser) {
        return Jwts.builder()
                .subject((loginUser.getEmail()))
                .id(loginUser.getId().toString())
                .issuedAt(new Date())
                .expiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(key(), SignatureAlgorithm.HS256)
                .compact();
    }

    private Key key() {

        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));

    }

    public boolean validateJwtToken(String authToke) {
        String jwtToken = authToke.substring("Bearer ".length());
        try {
            Jwts.parser().setSigningKey(key()).build().parse(jwtToken);
            return true;
        } catch (Exception e) {
                System.out.println("Error occurred when validate...");
        }
        return false;

    }
}

