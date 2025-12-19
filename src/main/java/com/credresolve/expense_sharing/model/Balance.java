package com.credresolve.expense_sharing.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "balances")
public class Balance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "from_user_id", nullable = false)
    private User fromUser;

    @ManyToOne
    @JoinColumn(name = "to_user_id", nullable = false)
    private User toUser;

    @Column(nullable = false)
    private BigDecimal amount;

    public Balance() {
    }

    public Balance(User fromUser, User toUser, BigDecimal amount) {
        this.fromUser = fromUser;
        this.toUser = toUser;
        this.amount = amount;
    }

    public Long getId() {
        return id;
    }

    public User getFromUser() {
        return fromUser;
    }

    public User getToUser() {
        return toUser;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setFromUser(User fromUser) {
        this.fromUser = fromUser;
    }

    public void setToUser(User toUser) {
        this.toUser = toUser;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
}
