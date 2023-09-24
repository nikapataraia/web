package com.lostpet.repositories;

import com.lostpet.models.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepo extends JpaRepository<Account,Long> {
    Account findByusername(String username);
    Account findByid(Long id);
    Account findByemail(String email);
}
