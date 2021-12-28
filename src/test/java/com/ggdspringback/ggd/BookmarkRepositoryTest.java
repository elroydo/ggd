package com.ggdspringback.ggd;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.annotation.Rollback;

import com.ggdspringback.ggd.domain.BookmarkRepository;
import com.ggdspringback.ggd.domain.UserRepository;
import com.ggdspringback.ggd.entity.Bookmark;
import com.ggdspringback.ggd.entity.User;

@DataJpaTest
@AutoConfigureTestDatabase(replace=Replace.NONE)
@Rollback(false)
public class BookmarkRepositoryTest {
	@Autowired
	private UserRepository uRepository;
	@Autowired
	private BookmarkRepository bRepository;
	
	@Autowired
	private TestEntityManager entityManager;
	
	//test case #1
	@Test
	public void testGetUserBookmarks() {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		
		User user = new User("testone", encoder.encode("testtone"), "USER", "testtone@email.com", "John", "Doe");
		Bookmark testBookmarkOne = new Bookmark("bookmark-title-1", "bookmark-description-1", "source-1", "link-1", "2021");
		Bookmark testBookmarkTwo = new Bookmark("bookmark-title-2", "bookmark-description-2", "source-2", "link-2", "2021");
		Bookmark testBookmarkThree = new Bookmark("bookmark-title-3", "bookmark-description-3", "source-3", "link-3", "2021");
		
		entityManager.persistAndFlush(user);
		
		List<Bookmark> bookmarks = Arrays.asList(testBookmarkOne, testBookmarkTwo, testBookmarkThree);
		
		bRepository.deleteAll();
		bRepository.saveAll(bookmarks);
		
		user.addBookmark(testBookmarkOne);
		user.addBookmark(testBookmarkTwo);
		user.addBookmark(testBookmarkThree);
		
		//test whether the three user bookmarks exist or not
		assertThat(bRepository.count()).isEqualTo(3);
	}
	
	//test case #1
	@Test
	public void testSaveBookmark() {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		
		User user = new User("testtwo", encoder.encode("testtwo"), "USER", "testtwo@email.com", "John", "Doe");
		Bookmark testBookmarkOne = new Bookmark("bookmark-title-1", "bookmark-description-1", "source-1", "link-1", "2021");
		
		entityManager.persistAndFlush(user);
		
		bRepository.deleteAll();
		bRepository.save(testBookmarkOne);
		
		user.addBookmark(testBookmarkOne);
		
		//test if the bookmark has been saved
		assertThat(bRepository.findByTitle(testBookmarkOne.getTitle()).getTitle()).isEqualTo(testBookmarkOne.getTitle());
	}
	
	@Test
	public void testDeleteBookmark() {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		
		User user = new User("testhree", encoder.encode("testthree"), "USER", "testthree@email.com", "John", "Doe");
		Bookmark testBookmarkOne = new Bookmark("bookmark-title-1", "bookmark-description-1", "source-1", "link-1", "2021");
		
		entityManager.persistAndFlush(user);
		
		bRepository.deleteAll();
		bRepository.save(testBookmarkOne);
		user.removeBookmark(bRepository.findByTitle(testBookmarkOne.getTitle()));
		
		//test if the bookmark has been deleted
		assertThat(user.doesBookmarkExist(testBookmarkOne)).isEqualTo(false);
	}
}
