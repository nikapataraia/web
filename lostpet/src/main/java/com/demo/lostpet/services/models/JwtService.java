package com.demo.lostpet.services.models;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class JwtService {
    private static final String SECRET_KEY = "3VHdK32zPnGMzoEWQRqADgt6kajtjhFeOteYuygdArqJ9Xwio9cMtEYd/brIoKbncY8l1x4mVlWmwkwX4YM3sJBFZioo+qxnhV1EF6ApQ6yXF8gvtXo7Vy+8+4t4b26YdmU+fbrMrOdtVFxBRlTMWPojmGxWQAyH+DOt3sOWJOXhsoqX9X5pA9rBt7W86RPy1sdC2vklsyuqUgSq18b/9hYiwAO6fL5/1GSrPL4ECMZ2PjGnRR5Lmituwzeytfe10Y6JtFTCQIRuJ99unKgV80Q4uV3751cuNHpOYktwJ7jnr/54gv8yVWle/dPD2KpM/RGym2oT2+sorHzCugQGcFM2ugzdQ/DAh4nRhvggmis=";
    public String extractEmail(String token){
        return extractClaim(token, Claims::getSubject);
    }

    public<T> T extractClaim(String token, Function<Claims,T> claimsResolver){
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    private Claims extractAllClaims(String token){
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJwt(token)
                .getBody();
    }
    private Key getSignKey(){
        byte[] keybytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keybytes);
    }

    public boolean isTokenValid(UserDetails userdetails, String token){
        final String userename = extractEmail(token);
        return userename.equals(userdetails.getUsername()) && !isTokenExpired(token);
    }

    public Date extractExpirationDate(String token){
        return extractClaim(token,Claims::getExpiration);
    }

    public boolean isTokenExpired(String token){
        return extractExpirationDate(token).before(new Date(System.currentTimeMillis()));
    }

    public String generateToken(UserDetails userDetails){
        return generateToken(new HashMap<>(),userDetails);
    }

    public String generateToken(Map<String,Object> extraClaims, UserDetails userDetails){
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1440000))
                .signWith(getSignKey(), SignatureAlgorithm.ES256)
                .compact();

    }
}
