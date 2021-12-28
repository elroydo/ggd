package com.ggdspringback.ggd.entity;

import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
@Entity
@Table(name = "todo")
public class ToDo {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false, updatable = false)
	private long todoId;
	@Column(nullable = false)
	private String description;

	public ToDo() {}

	public ToDo(String description) {
		super();
		this.description = description;
	}

	@ManyToMany(mappedBy = "todos", cascade = CascadeType.ALL)
	private Set<User> users;

	public void addToDo(User user) {
		users.add(user);
	}

	public Set<User> getUsers() {
		return users;
	}

	public void setUsers(Set<User> users) {
		this.users = users;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}	

	public long getToDoId() {
		return todoId;
	}

	public void setToDoId(long todoId) {
		this.todoId = todoId;
	}
}