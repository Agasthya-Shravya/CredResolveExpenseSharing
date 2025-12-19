package com.credresolve.expense_sharing.repository;

import com.credresolve.expense_sharing.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
}
