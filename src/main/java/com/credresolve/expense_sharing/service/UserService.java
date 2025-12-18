package com.credresolve.expense_sharing.service;

import org.springframework.stereotype.Service;

import com.credresolve.expense_sharing.model.User;
import com.credresolve.expense_sharing.repository.UserRepository;

@Service
public class UserService {
	
    private final UserRepository userRepository;
    
    public UserService(UserRepository userRepository) {
    	this.userRepository=userRepository;
    }
    
    public User createUser(User user) {
    	return userRepository.save(user);
    }
}
