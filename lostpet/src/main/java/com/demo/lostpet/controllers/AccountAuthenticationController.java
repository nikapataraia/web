package com.demo.lostpet.controllers;

import com.demo.lostpet.models.Account;
import com.demo.lostpet.models.AuthenticationResponse;
import com.demo.lostpet.services.models.Authenticationservice;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
public class AccountAuthenticationController {
    private Authenticationservice service;
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody @Valid Account acc){
        return ResponseEntity.ok(service.register(acc));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody @Valid Account acc){
        return ResponseEntity.ok(service.authonticate(acc));
    }
}
