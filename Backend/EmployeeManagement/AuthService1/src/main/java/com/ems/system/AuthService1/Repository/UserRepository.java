package com.ems.system.AuthService1.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


import com.ems.system.AuthService1.Entity.User;

public interface UserRepository extends JpaRepository<User, Long>{
	
	Optional<User> findByUsername(String username);
//	Search and Returns user object from db

}
