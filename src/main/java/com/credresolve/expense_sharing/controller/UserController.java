package com.credresolve.expense_sharing.controller;

import com.credresolve.expense_sharing.service.UserService;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import com.credresolve.expense_sharing.model.User;
import org.springframework.validation.annotation.Validated;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
	private final UserService userService;
	
	public UserController(UserService userService) {
		this.userService=userService;
	}
	
	@PostMapping
	public User createUser(@Validated @RequestBody User user) {
		return userService.createUser(user);
	}
	
	@GetMapping
	public List<User> getAllUsers() {
	    return userService.getAllUsers();
	}

}
