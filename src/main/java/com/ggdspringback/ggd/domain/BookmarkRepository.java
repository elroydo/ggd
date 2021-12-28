package com.ggdspringback.ggd.domain;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ggdspringback.ggd.entity.Bookmark;
import com.ggdspringback.ggd.entity.User;

@Repository
public interface BookmarkRepository extends CrudRepository<Bookmark, Long> {
	List<Bookmark> findByUsers(User user);
	
	@Query("select c from Bookmark c where c.title = ?1")
	Bookmark findByTitle(String title);
}
