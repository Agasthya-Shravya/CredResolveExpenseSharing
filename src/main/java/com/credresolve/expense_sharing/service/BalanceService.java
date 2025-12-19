package com.credresolve.expense_sharing.service;

import com.credresolve.expense_sharing.model.Balance;
import com.credresolve.expense_sharing.repository.BalanceRepository;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;
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
    public Map<Long, BigDecimal> getNetBalances() {

        Map<Long, BigDecimal> netBalanceMap = new HashMap<>();

        for (Balance balance : balanceRepository.findAll()) {

            Long fromUserId = balance.getFromUser().getId();
            Long toUserId = balance.getToUser().getId();
            BigDecimal amount = balance.getAmount();

            netBalanceMap.put(
                    fromUserId,
                    netBalanceMap.getOrDefault(fromUserId, BigDecimal.ZERO).subtract(amount)
            );

            netBalanceMap.put(
                    toUserId,
                    netBalanceMap.getOrDefault(toUserId, BigDecimal.ZERO).add(amount)
            );
        }

        return netBalanceMap;
    }

}
