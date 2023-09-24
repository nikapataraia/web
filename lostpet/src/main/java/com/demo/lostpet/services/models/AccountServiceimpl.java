package com.demo.lostpet.services.models;


import com.demo.lostpet.models.Account;
import com.demo.lostpet.repositories.AccountRepo;
import com.demo.lostpet.services.interfaces.AccountService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.Collection;

@RequiredArgsConstructor
@Service
@Slf4j
public class AccountServiceimpl implements AccountService {
    private final AccountRepo accountrepo;
    @Override
    public Account create(Account acc) {
        log.info("creating : {}" , acc.getId());
        acc.setImageurl(setImgurl());
        return accountrepo.save(acc);
    }

    @Override
    public Collection<Account> list(int from , int to) {
        log.info("fetching accounts");
        return accountrepo.findAll(PageRequest.of(from,to)).toList();
    }

    public Account getbyname(String name){
        return accountrepo.findByusername(name);
    }
    public Account getbyemail(String email){
        return accountrepo.findByemail(email);
    }

    @Override
    public Account get(Long id) {
        log.info("getting acc : {}" , id);
        return accountrepo.findByid(id);
    }

    @Override
    public Account update(Account acc) {
        log.info("updating acc : {}" , acc.getId());
        return accountrepo.save(acc);
    }

    @Override
    public boolean delete(Long id) {
        log.info("deleting acc : {}" , id);
        accountrepo.deleteById(id);
        return true;
    }


    private String setImgurl() {
        log.info(ServletUriComponentsBuilder.fromCurrentContextPath().path("/image/defaultimg.webp").toUriString());
        return ServletUriComponentsBuilder.fromCurrentContextPath().path("/image/defaultimg.webp").toUriString();
    }
}
