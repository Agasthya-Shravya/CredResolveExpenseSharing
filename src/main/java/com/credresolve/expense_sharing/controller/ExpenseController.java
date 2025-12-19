package com.credresolve.expense_sharing.controller;

import com.credresolve.expense_sharing.model.Expense;
import com.credresolve.expense_sharing.model.Group;
import com.credresolve.expense_sharing.model.User;
import com.credresolve.expense_sharing.repository.GroupRepository;
import com.credresolve.expense_sharing.repository.UserRepository;
import com.credresolve.expense_sharing.service.ExpenseService;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;
    private final GroupRepository groupRepository;
    private final UserRepository userRepository;

    public ExpenseController(ExpenseService expenseService,
                             GroupRepository groupRepository,
                             UserRepository userRepository) {
        this.expenseService = expenseService;
        this.groupRepository = groupRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/equal")
    public Expense addEqualExpense(@RequestParam String description,
                                   @RequestParam BigDecimal amount,
                                   @RequestParam Long groupId,
                                   @RequestParam Long paidByUserId) {

        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        User paidBy = userRepository.findById(paidByUserId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return expenseService.addEqualExpense(description, amount, group, paidBy);
    }
}
