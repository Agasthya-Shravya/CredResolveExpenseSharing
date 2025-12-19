package com.credresolve.expense_sharing.service;

import com.credresolve.expense_sharing.model.Balance;
import com.credresolve.expense_sharing.repository.BalanceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BalanceService {

    private final BalanceRepository balanceRepository;

    public BalanceService(BalanceRepository balanceRepository) {
        this.balanceRepository = balanceRepository;
    }

    public List<Balance> getAllBalances() {
        return balanceRepository.findAll();
    }
}
