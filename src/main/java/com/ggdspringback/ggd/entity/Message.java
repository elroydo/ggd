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
@Table(name="message")
public class Message {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(nullable = false, updatable = false)
	private long messageID;
	@Column(nullable = false)
	private String forename, username, timestamp;
	@Column(nullable = false, length = 500)
	private String message;
	
	public Message() {}
	public Message(String forename, String username,String message,String timestamp) {
		super();
		this.forename = forename;
		this.username = username;
		this.message = message;
		this.timestamp = timestamp;
	}
		
	@ManyToMany(mappedBy = "messages", cascade = CascadeType.ALL)
	private Set<User> users;
	
	public void addMessage(User user) {
		users.add(user);
	}
	
	public long getMessageID() {
		return messageID;
	}
	public void setMessageID(long messageID) {
		this.messageID = messageID;
	}
	public String getForename() {
		return forename;
	}
	public void setForename(String forename) {
		this.forename = forename;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String messsage) {
		this.message = messsage;
	}
	public String getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}

}
