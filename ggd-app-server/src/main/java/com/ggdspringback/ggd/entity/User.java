package com.ggdspringback.ggd.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name = "user")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false, updatable = false)
	private Long id;

	@Column(nullable = false, unique = true)
	private String username;

	@Column(nullable = false, length = 64)
	private String password;

	@Column(nullable = false)
	private String role;

	@Column(nullable = false, unique = true, length = 45)
	private String email;

	@Column(nullable = false, length = 23)
	private String forename;

	@Column(nullable = false, length = 23)
	private String surname;

	@ManyToMany(cascade = CascadeType.MERGE)
	@JoinTable(name = "user_Bookmarks", joinColumns = @JoinColumn(name = "id"), inverseJoinColumns = @JoinColumn(name = "bookmarkId"))
	private Set<Bookmark> bookmarks = new HashSet<Bookmark>(0);

	@ManyToMany(cascade = CascadeType.MERGE)
	@JoinTable(name = "user_Actions", joinColumns = @JoinColumn(name = "id"), inverseJoinColumns = @JoinColumn(name = "actionId"))
	private Set<Action> actions = new HashSet<Action>(0);

	@ManyToMany(cascade = CascadeType.MERGE)
	@JoinTable(name = "user_Results", joinColumns = @JoinColumn(name = "id"), inverseJoinColumns = @JoinColumn(name = "resultId"))
	private Set<Result> results = new HashSet<Result>(0);

	@ManyToMany(cascade = CascadeType.MERGE)
	@JoinTable(name = "user_ToDos", joinColumns = @JoinColumn(name = "id"), inverseJoinColumns = @JoinColumn(name = "todoId"))
	private Set<ToDo> todos = new HashSet<ToDo>(0);

	@ManyToMany(cascade = CascadeType.MERGE)
	@JoinTable(name = "chat_Messages", joinColumns = @JoinColumn(name = "id"), inverseJoinColumns = @JoinColumn(name = "messageID"))
	private Set<Message> messages = new HashSet<Message>(0);

	// @ManyToMany(mappedBy = "usersBookmarks", cascade = CascadeType.ALL)
	// private List<Bookmark> bookmarks = new ArrayList<>();

	public void addBookmark(Bookmark bookmark) {
		bookmarks.add(bookmark);
	}

	public void removeBookmark(Bookmark bookmark) {
		bookmarks.remove(bookmark);
	}
	
	public boolean doesBookmarkExist(Bookmark bookmark) {
		return bookmarks.contains(bookmark);
	}

	public void addAction(Action action) {
		actions.add(action);
	}

	public void removeAction(Action action) {
		actions.remove(action);
	}

	public void saveResult(Result result) {
		results.add(result);
	}

	public void addMessage(Message message) {
		messages.add(message);
	}

	public void addToDo(ToDo todo) {
		todos.add(todo);
	}

	public void removeTodo(ToDo toDo) {
		todos.remove(toDo);
	}

	public User() {
	}

	public User(String username, String password, String role, String email, String forename, String surname) {
		this.username = username;
		this.password = password;
		this.email = email;
		this.role = role;
		this.forename = forename;
		this.surname = surname;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getForename() {
		return forename;
	}

	public void setForename(String forename) {
		this.forename = forename;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}
}
