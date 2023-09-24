package com.lostpet.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(unique = true)
    @jakarta.validation.constraints.NotEmpty(message = "username ca not be empty")
    private String username;
    private String fullname;
    private String imageurl;
    @Column(unique = true)
    @jakarta.validation.constraints.NotEmpty(message = "email can not be empty")
    private String email;
    private String number;
}
