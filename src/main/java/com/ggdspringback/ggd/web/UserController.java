package com.ggdspringback.ggd.web;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ggdspringback.ggd.domain.ActionRepository;
import com.ggdspringback.ggd.domain.BookmarkRepository;
import com.ggdspringback.ggd.domain.MessageRepository;
import com.ggdspringback.ggd.domain.ResultRepository;
import com.ggdspringback.ggd.domain.ToDoRepository;
import com.ggdspringback.ggd.domain.UserRepository;
import com.ggdspringback.ggd.entity.Action;
import com.ggdspringback.ggd.entity.Bookmark;
import com.ggdspringback.ggd.entity.Message;
import com.ggdspringback.ggd.entity.Result;
import com.ggdspringback.ggd.entity.ToDo;
import com.ggdspringback.ggd.entity.User;
import com.ggdspringback.ggd.exception.ResourceNotFoundException;

@RestController
public class UserController {
	@Autowired
	private UserRepository uRepository;
	@Autowired
	private BookmarkRepository bRepository;
	@Autowired
	private ActionRepository aRepository;
	@Autowired
	private ResultRepository rRepository;
	@Autowired
	private MessageRepository mRepository;
	@Autowired
	private ToDoRepository tRepository;

	// get all users
	@RequestMapping("/users")
	public Iterable<User> getUsers() {
		return uRepository.findAll();
	}

	// get user
	@GetMapping("/user/{username}")
	public User getUser(@PathVariable(value = "username") String username) throws Exception {
		if(uRepository.findByUsername(username) == null) throw new ResourceNotFoundException("User", "username", username);
		return uRepository.findByUsername(username);
	}

	// update user 
	@PostMapping("user/update-user/{id}")
	public ResponseEntity<Object> processRegistration(@PathVariable(value = "id") Long id, HttpServletRequest req, HttpServletResponse res, User updatedUser)
			throws IOException, ServletException {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		User updatedDetails = new ObjectMapper().readValue(req.getInputStream(), User.class);
		User user = uRepository.findById(id).get();
		user.setForename(updatedDetails.getForename());
		user.setSurname(updatedDetails.getSurname());
		user.setEmail(updatedDetails.getEmail());
		user.setPassword(updatedDetails.getPassword());
		uRepository.save(user);

		return ResponseEntity.ok().body("Successfuly updated user details");
	}

	// delete user
	@DeleteMapping("/user/delete/{username}")
	public ResponseEntity<Object> deleteUser(@PathVariable(value = "username") String username) {
		if(uRepository.findByUsername(username) == null) throw new ResourceNotFoundException("User", "username", username);
		uRepository.delete(uRepository.findByUsername(username));
		
		return ResponseEntity.ok().body(username + " has been deleted");
	}

	// retrieve user bookmarks
	@GetMapping("/user/{username}/bookmarks")
	public Iterable<Bookmark> getBookmarks(@PathVariable(value = "username") String username) {
		return bRepository.findByUsers(uRepository.findByUsername(username));
	}

	// save user bookmark
	@PostMapping("/user/{username}/create-bookmark")
	public ResponseEntity<Object> createBookmark(@PathVariable(value = "username") String username, HttpServletRequest req,
			HttpServletResponse res, Bookmark bookmark) throws IOException, ServletException {
		bookmark = new ObjectMapper().readValue(req.getInputStream(), Bookmark.class);
		User user = uRepository.findByUsername(username);
		bRepository.save(bookmark);
		user.addBookmark(bookmark);
		uRepository.save(user);
		return ResponseEntity.ok().body(bookmark.getTitle() + " bookmarked");
	}
	
	// delete user bookmark by title
	@DeleteMapping("/user/{username}/delete-bookmark")
	public ResponseEntity<Object> deleteUserBookmarkByTitle(@PathVariable(value = "username") String username, HttpServletRequest req) throws IOException, ServletException {
		Bookmark bookmarkToDelete = new ObjectMapper().readValue(req.getInputStream(), Bookmark.class);
		User user = uRepository.findByUsername(username);
		user.removeBookmark(bRepository.findByTitle(bookmarkToDelete.getTitle()));
		uRepository.save(user);
		return ResponseEntity.ok().body(bookmarkToDelete.getTitle() + " bookmark deleted");
	}

	// delete user bookmark by id
	@DeleteMapping("/user/{username}/delete-bookmark/{id}")
	public ResponseEntity<Object> deleteUserBookmarkByID(@PathVariable(value = "username") String username, @PathVariable(value = "id") Long id) throws IOException {
		User user = uRepository.findByUsername(username);
		user.removeBookmark(bRepository.findById(id).get());
		uRepository.save(user);
		return ResponseEntity.ok().body("bookmark deleted");
	}

	// save user calculator results
	@PostMapping("/user/{username}/save-result")
	public ResponseEntity<Object> processRegistration(@PathVariable(value = "username") String username, HttpServletRequest req,
			HttpServletResponse res, Result result) throws IOException, ServletException {
		result = new ObjectMapper().readValue(req.getInputStream(), Result.class);
		User user = uRepository.findByUsername(username);
		rRepository.save(result);
		user.saveResult(result);
		uRepository.save(user);
		return ResponseEntity.ok().body("Results saved");
	}

	// retrieve user calc results
	@GetMapping("/user/{username}/get-result")
	public List<Result> getCalcResults(@PathVariable(value = "username") String username) {
		return rRepository.findByUsers(uRepository.findByUsername(username));
	}

	// retrieve user actions
	@GetMapping("/user/{username}/actions")
	public Iterable<Action> getActions(@PathVariable(value = "username") String username) {
		return aRepository.findByUsers(uRepository.findByUsername(username));
	}

	// save user actions
	@PostMapping("/user/{username}/create-actions")
	public ResponseEntity<Object> processRegistration(@PathVariable(value = "username") String username, HttpServletRequest req,
			HttpServletResponse res, Action action) throws IOException, ServletException {
		action = new ObjectMapper().readValue(req.getInputStream(), Action.class);
		User user = uRepository.findByUsername(username);
		aRepository.save(action);
		user.addAction(action);
		uRepository.save(user);
		return ResponseEntity.ok().body("Action saved");
	}
	
	// delete user actions by id
	@DeleteMapping("/user/{username}/delete-action/{id}")
	public ResponseEntity<Object> deleteUserActionByID(@PathVariable(value = "username") String username, @PathVariable(value = "id") Long id) throws IOException {
		User user = uRepository.findByUsername(username);
		Action deleteAction = aRepository.findByTitleAndCreatedBy(aRepository.findById(id).get().getTitle(), "user");
		user.removeAction(deleteAction);
		aRepository.delete(deleteAction);
		uRepository.save(user);
		return ResponseEntity.ok().body("Action deleted");
	}

	// post user message
	@PostMapping("/user/{username}/post-message")
	public ResponseEntity<Object> postMessage(@PathVariable(value = "username") String username, HttpServletRequest req,
			HttpServletResponse res, Message message) throws IOException, ServletException {
		message = new ObjectMapper().readValue(req.getInputStream(), Message.class);
		User user = uRepository.findByUsername(username);
		mRepository.save(message);
		user.addMessage(message);
		uRepository.save(user);
		return ResponseEntity.ok().body("Message posted");
	}

	// retrieve user todos
	@GetMapping("/user/{username}/todos")
	public Iterable<ToDo> getToDos(@PathVariable(value = "username") String username) {
		return tRepository.findByUsers(uRepository.findByUsername(username));
	}

	// save user todos
	@PostMapping("/user/{username}/create-todos")
	public ResponseEntity<Object> processRegistration(@PathVariable(value = "username") String username, HttpServletRequest req,
			HttpServletResponse res, ToDo todo) throws IOException, ServletException {
		todo = new ObjectMapper().readValue(req.getInputStream(), ToDo.class);
		User user = uRepository.findByUsername(username);
		tRepository.save(todo);
		user.addToDo(todo);
		uRepository.save(user);
		return ResponseEntity.ok().body("To-Do created");
	}

	// delete user to-dos by id
	@DeleteMapping("/user/{username}/delete-todos/{id}")
	public ResponseEntity<Object> deleteUserToDosByID(@PathVariable(value = "username") String username, @PathVariable(value = "id") Long id) throws IOException {
		User user = uRepository.findByUsername(username);
		user.removeTodo(tRepository.findById(id).get());
		uRepository.save(user);
		return ResponseEntity.ok().body("To-Do deleted");
	}

	// // delete user To-Do by description 
	// @DeleteMapping("/user/{username}/delete-todos")
	// public ResponseEntity<Object> deleteUserToDoByTitle(@PathVariable(value = "username") String username, HttpServletRequest req) throws IOException, ServletException {
	// 	ToDo ToDoToDelete = new ObjectMapper().readValue(req.getInputStream(), ToDo.class);
	// 	User user = uRepository.findByUsername(username);
	// 	user.removeTodo(tRepository.findByDescription(ToDoToDelete.getDescription()));
	// 	uRepository.save(user);
	// 	return ResponseEntity.ok().body(ToDoToDelete.getDescription() + " to-do deleted");
	// }
}
