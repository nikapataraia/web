package com.lostpet.controllers;

import com.lostpet.models.Account;
import com.lostpet.services.models.AccountServiceimpl;
import com.lostpet.services.models.Response;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Map;

import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;

@RestController
@RequestMapping("/register")
@RequiredArgsConstructor
@Slf4j
public class AccountRegistrationController {
    private final AccountServiceimpl accservice;

    @PutMapping("/save")
    public ResponseEntity<Response> saveAccount(@RequestBody @Valid Account acc){
        log.info("ylaa");
        return ResponseEntity.ok(
                Response.builder().timestamp(LocalDateTime.now())
                        .data(Map.of("account" , accservice.create(acc)))
                        .message("account saved")
                        .status(HttpStatus.OK)
                        .statuscode(HttpStatus.OK.value())
                        .build()
        );
    }

    @GetMapping("/list")
    public ResponseEntity<Response> getAccounts(){
        log.info("ylaa");
        return ResponseEntity.ok(
                Response.builder().timestamp(LocalDateTime.now())
                        .data(Map.of("accounts" , accservice.list(0,20)))
                        .message("accounts retrieved")
                        .status(HttpStatus.OK)
                        .statuscode(HttpStatus.OK.value())
                        .build()
        );
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Response> getAccount(@PathVariable("id") Long id){
        log.info("ylaa");
        return ResponseEntity.ok(
                Response.builder().timestamp(LocalDateTime.now())
                        .data(Map.of("account" , accservice.get(id)))
                        .message("account retrieved")
                        .status(HttpStatus.OK)
                        .statuscode(HttpStatus.OK.value())
                        .build()
        );
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Response> deleteAccount(@PathVariable("id") Long id){
        log.info("ylaa");
        return ResponseEntity.ok(
                Response.builder().timestamp(LocalDateTime.now())
                        .data(Map.of("deleted" , accservice.delete(id)))
                        .message("account deleted")
                        .status(HttpStatus.OK)
                        .statuscode(HttpStatus.OK.value())
                        .build()
        );
    }

    @GetMapping(path = "/image/{imagename}" , produces = IMAGE_PNG_VALUE)
    public byte[] getAccountimage(@PathVariable("imagename") String imagename) throws IOException {
        return Files.readAllBytes(Paths
                .get("D:\\git_rep\\web\\lostpet\\back\\server\\src\\main\\resources\\images\\" + imagename));
    }

}

