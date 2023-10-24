package com.demo.lostpet.services.models;

import com.demo.lostpet.models.Account;
import com.demo.lostpet.models.AuthenticationResponse;
import com.demo.lostpet.repositories.AccountRepo;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.User;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class Authenticationservice {
    private final AccountRepo repo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    public AuthenticationResponse register(Account acc) {
        Account account = acc;
        account.setPassword(passwordEncoder.encode(acc.getPassword()));
        repo.save(account);
        var jwtToken = jwtService.generateToken(account);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    public AuthenticationResponse authonticate(Account acc) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(acc.getEmail(),acc.getPassword()));
        var jwtToken = jwtService.generateToken(acc);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }
}
