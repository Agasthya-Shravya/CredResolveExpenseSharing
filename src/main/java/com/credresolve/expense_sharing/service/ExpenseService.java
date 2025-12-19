package com.credresolve.expense_sharing.service;

import com.credresolve.expense_sharing.model.*;
import com.credresolve.expense_sharing.repository.*;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Set;
import java.util.Map;


@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final ExpenseSplitRepository expenseSplitRepository;
    private final BalanceRepository balanceRepository;

    public ExpenseService(ExpenseRepository expenseRepository,
                          ExpenseSplitRepository expenseSplitRepository,
                          BalanceRepository balanceRepository) {
        this.expenseRepository = expenseRepository;
        this.expenseSplitRepository = expenseSplitRepository;
        this.balanceRepository = balanceRepository;
    }

    public Expense addEqualExpense(String description,
                                   BigDecimal amount,
                                   Group group,
                                   User paidBy) {

        Expense expense = new Expense();
        expense.setDescription(description);
        expense.setAmount(amount);
        expense.setSplitType(SplitType.EQUAL);
        expense.setGroup(group);
        expense.setPaidBy(paidBy);

        expense = expenseRepository.save(expense);

        Set<User> users = group.getUsers();
        BigDecimal splitAmount = amount.divide(
                BigDecimal.valueOf(users.size()),
                2,
                RoundingMode.HALF_UP
        );

        for (User user : users) {
            ExpenseSplit split = new ExpenseSplit(expense, user, splitAmount);
            expenseSplitRepository.save(split);

            if (!user.getId().equals(paidBy.getId())) {
                Balance balance = new Balance(user, paidBy, splitAmount);
                balanceRepository.save(balance);
            }
        }

        return expense;
    }
    public Expense addExactExpense(String description,
            BigDecimal amount,
            Group group,
            User paidBy,
            Map<Long, BigDecimal> userAmountMap) {

				Expense expense = new Expense();
				expense.setDescription(description);
				expense.setAmount(amount);
				expense.setSplitType(SplitType.EXACT);
				expense.setGroup(group);
				expense.setPaidBy(paidBy);

				expense = expenseRepository.save(expense);
			
				for (Map.Entry<Long, BigDecimal> entry : userAmountMap.entrySet()) {
					User user = group.getUsers().stream().filter(u -> u.getId().equals(entry.getKey())).findFirst().orElseThrow(() -> new RuntimeException("User not in group"));
					
					BigDecimal splitAmount = entry.getValue();
		
					expenseSplitRepository.save(new ExpenseSplit(expense, user, splitAmount));
					
					if (!user.getId().equals(paidBy.getId())) {
						balanceRepository.save(new Balance(user, paidBy, splitAmount));
					}
				}
			
			return expense;
    }
    public Expense addPercentageExpense(String description,
            BigDecimal amount,
            Group group,
            User paidBy,
            Map<Long, BigDecimal> userPercentageMap) {

				Expense expense = new Expense();
				expense.setDescription(description);
				expense.setAmount(amount);
				expense.setSplitType(SplitType.PERCENTAGE);
				expense.setGroup(group);
				expense.setPaidBy(paidBy);
				
				expense = expenseRepository.save(expense);
				
				for (Map.Entry<Long, BigDecimal> entry : userPercentageMap.entrySet()) {
					User user = group.getUsers().stream().filter(u -> u.getId().equals(entry.getKey())).findFirst().orElseThrow(() -> new RuntimeException("User not in group"));
						
					
					
					BigDecimal percentage = entry.getValue();
					BigDecimal splitAmount = amount.multiply(percentage).divide(BigDecimal.valueOf(100));
					
					expenseSplitRepository.save(new ExpenseSplit(expense, user, splitAmount));
					
					if (!user.getId().equals(paidBy.getId())) {
						balanceRepository.save(new Balance(user, paidBy, splitAmount));
					}
				}
				
				return expense;
				
    }
}
