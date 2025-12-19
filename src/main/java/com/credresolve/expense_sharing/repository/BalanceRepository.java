package com.credresolve.expense_sharing.repository;

import com.credresolve.expense_sharing.model.Balance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BalanceRepository extends JpaRepository<Balance, Long> {
}
