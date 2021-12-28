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
@Table(name="bookmark")
public class Bookmark {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(nullable = false, updatable = false)
	private long bookmarkId;
	@Column(nullable = false, length = 500)
	private String title, description;
	@Column(nullable = false)
	private String url, sourceName, publishedAt;
	
	public Bookmark() {}
	public Bookmark(String title, String description, String sourceName, String url, String publishedAt) {
		super();
		this.title = title;
		this.description = description;
		this.sourceName = sourceName;
		this.url = url;
		this.publishedAt = publishedAt;
		
	}
	
//	@ManyToMany(cascade = CascadeType.MERGE)
//	@JoinTable(name = "user_Bookmarks", joinColumns = @JoinColumn(name = "id"), inverseJoinColumns = @JoinColumn(name="bookmarkId"))
//	private List<User> usersBookmarks = new ArrayList<>();
	
	@ManyToMany(mappedBy = "bookmarks", cascade = CascadeType.ALL)
	private Set<User> users;
	
	public void addBookmarkUser(User user) {
		users.add(user);
	}
	
	public Set<User> getUsers() {
		return users;
	}
	public void setUsers(Set<User> users) {
		this.users = users;
	}
	public long getBookmarkId() {
		return bookmarkId;
	}
	public void setBookmarkId(long bookmarkId) {
		this.bookmarkId = bookmarkId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getSourceName() {
		return sourceName;
	}
	public void setSourceName(String sourceName) {
		this.sourceName = sourceName;
	}
	public String getPublishedAt() {
		return publishedAt;
	}
	public void setPublishedAt(String publishedAt) {
		this.publishedAt = publishedAt;
	}
}
