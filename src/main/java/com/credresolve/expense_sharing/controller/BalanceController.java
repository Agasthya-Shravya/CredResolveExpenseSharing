package com.credresolve.expense_sharing.controller;
import java.math.BigDecimal;
import java.util.Map;
import com.credresolve.expense_sharing.model.Balance;
import com.credresolve.expense_sharing.service.BalanceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/balances")
public class BalanceController {

    private final BalanceService balanceService;

    public BalanceController(BalanceService balanceService) {
        this.balanceService = balanceService;
    }

    @GetMapping
    public List<Balance> getBalances() {
        return balanceService.getAllBalances();
    }
    
    @GetMapping("/simplified")
    public Map<Long, BigDecimal> getSimplifiedBalances() {
        return balanceService.getNetBalances();
    }

}
