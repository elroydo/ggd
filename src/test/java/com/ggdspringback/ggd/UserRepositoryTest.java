package com.ggdspringback.ggd;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.annotation.Rollback;

import com.ggdspringback.ggd.domain.UserRepository;
import com.ggdspringback.ggd.entity.User;

@DataJpaTest
@AutoConfigureTestDatabase(replace=Replace.NONE)
@Rollback(false)
public class UserRepositoryTest {
	@Autowired
	private UserRepository uRepository;
	
	@Autowired
	private TestEntityManager entityManager;
	
	//test case #1
	@Test
	public void testCreateUser() {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		
		User user = new User("testone", encoder.encode("testtone"), "USER", "testtone@email.com", "John", "Doe");
		
		entityManager.persistAndFlush(user);
		
		User savedUser = uRepository.save(user);
		User existUser = entityManager.find(User.class, savedUser.getId());
		
		//test whether the user created exists
		assertThat(existUser.getUsername()).isEqualTo(savedUser.getUsername());
	}
	
	//test case #2
	@Test
	public void testFindUserByEmail() {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		User user = new User("testtwo", encoder.encode("testtwo"), "USER", "testtwo@email.com", "John", "Doe");
		
		entityManager.persistAndFlush(user);
		
		String email = "testtwo@email.com";
		
		//find existing user by email
		assertThat(uRepository.findByEmail(email)).isNotNull();
	}
	
	//test case #3
	@Test
	public void testDeleteUser() {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		User user = new User("testthree", encoder.encode("testthree"), "USER", "testthree@email.com", "John", "Doe");
		
		entityManager.persistAndFlush(user);
		
		//delete user
		uRepository.delete(user);
		
		//test if user has been deleted
		assertThat(uRepository.findById(user.getId())).isEmpty();
	}
	
	//test case #4
	@Test
	public void testDeleteAllUsers() {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		entityManager.persistAndFlush(new User("testfoura", encoder.encode("testfoura"), "USER", "testfoura@email.com", "John", "Doe"));
		entityManager.persistAndFlush(new User("testfourb", encoder.encode("testfourb"), "USER", "testfourb@email.com", "Doe", "John"));
		entityManager.persistAndFlush(new User("testfourc", encoder.encode("testfourc"), "USER", "testfourc@email.com", "Dohn", "Joe"));
		
		//delete all users
		uRepository.deleteAll();
		
		//test if all the users have been deleted
		assertThat(uRepository.findAll()).isEmpty();
	}
	
	//test case #5
	@Test
	public void testUpdateUserPassword() {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		User user = new User("testfive", encoder.encode("testfive"), "USER", "testfive@email.com", "John", "Doe");
		entityManager.persistAndFlush(user);
		String newPassword = encoder.encode("newpassword");
		
		uRepository.save(user);
		
		//update password
		user.setPassword(newPassword);
		
		uRepository.save(user);
		
		//test if password has been updated
		assertThat(user.getPassword()).isEqualTo(newPassword);
	}
}
