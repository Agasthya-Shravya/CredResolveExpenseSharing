package com.credresolve.expense_sharing.repository;

import com.credresolve.expense_sharing.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
