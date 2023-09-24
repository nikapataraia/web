package com.demo.lostpet.configurations;

import com.demo.lostpet.repositories.AccountRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfiguration {
    private final AccountRepo repo;
    @Bean
    public UserDetailsService userdetailsService(){
        return repo::findByemail;
    }
}
