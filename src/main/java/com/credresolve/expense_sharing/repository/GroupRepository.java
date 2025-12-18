package com.credresolve.expense_sharing.repository;

import com.credresolve.expense_sharing.model.Group;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupRepository extends JpaRepository<Group, Long> {
}
