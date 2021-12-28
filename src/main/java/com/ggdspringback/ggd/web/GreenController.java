package com.ggdspringback.ggd.web;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ggdspringback.ggd.domain.MessageRepository;
import com.ggdspringback.ggd.domain.ActionRepository;
import com.ggdspringback.ggd.domain.UserRepository;
import com.ggdspringback.ggd.entity.Message;
import com.ggdspringback.ggd.entity.User;
import com.ggdspringback.ggd.entity.Action;

@RestController
public class GreenController {
	@Autowired
	private UserRepository uRepository;

	@Autowired
	private MessageRepository mRepository;

	@Autowired
	private ActionRepository aRepository;

	// register account
	@PostMapping("/register")
	public String processRegistration(HttpServletRequest req, HttpServletResponse res, User user) throws IOException, ServletException {
		user = new ObjectMapper().readValue(req.getInputStream(), User.class);
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		user.setPassword(encoder.encode(user.getPassword()));

		uRepository.save(user);

		return "User Registered Successfully";
	}

	// get all chat
	@RequestMapping("/chat")
	public Iterable<Message> getChat() {
		return mRepository.findAll();
	}

	//get all Actions
	@RequestMapping("/actions")
	public Iterable<Action> getAction() {
	System.out.println(aRepository.findAll());
	return aRepository.findAll();
	}
}