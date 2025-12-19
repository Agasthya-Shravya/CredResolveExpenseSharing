package com.credresolve.expense_sharing.repository;

import com.credresolve.expense_sharing.model.ExpenseSplit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseSplitRepository extends JpaRepository<ExpenseSplit, Long> {
}
