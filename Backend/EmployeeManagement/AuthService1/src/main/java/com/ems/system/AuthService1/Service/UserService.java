package com.ems.system.AuthService1.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ems.system.AuthService1.Entity.User;
import com.ems.system.AuthService1.Repository.UserRepository;
import com.ems.system.AuthService1.Security.JwtUtil;

@Service
public class UserService {

	@Autowired
	private UserRepository repo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

	public User register(User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return repo.save(user);
	}
	@Autowired
	private JwtUtil jwtUtil;

	public String login(String username, String password) {

	    Optional<User> optionalUser = repo.findByUsername(username);

	    if(optionalUser.isPresent()) {
	        User user = optionalUser.get();

	        if(passwordEncoder.matches(password, user.getPassword())) {
	            return jwtUtil.generateToken(username); 
	        }
	    }

	    throw new RuntimeException("Invalid Username or Password");
	}
	
	
}
