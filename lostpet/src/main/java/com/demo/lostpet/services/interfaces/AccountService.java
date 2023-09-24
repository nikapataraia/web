package com.demo.lostpet.services.interfaces;


import com.demo.lostpet.models.Account;
import java.util.Collection;
public interface AccountService {
    Account create(Account acc);
    Collection<Account> list(int from , int to);
    Account get(Long id);
    Account update(Account acc);
    boolean delete(Long id);


}