package com.ggdspringback.ggd.domain;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ggdspringback.ggd.entity.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
	@Query("select c from User c where c.username = ?1")
	User findByUsername(String username);
	
	@Query("select c from User c where c.email = ?1")
	User findByEmail(String email);
}