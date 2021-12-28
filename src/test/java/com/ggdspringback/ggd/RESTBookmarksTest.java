package com.ggdspringback.ggd;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

@SpringBootTest
@AutoConfigureMockMvc
public class RESTBookmarksTest {
	@Autowired
	private MockMvc mockMvc;

	//get user bookmarks API test
	@Test
	public void testGetUserBookmarks() throws Exception {
		//testing fetching user bookmarks
		MvcResult mvcResult = this.mockMvc.perform(post("/login")
				.content("{\"username\":\"user\", \"password\":\"user\"}")).andReturn();
		String headerValue = mvcResult.getResponse().getHeader("Authorization");
		
		this.mockMvc.perform(get("/user/user/bookmarks")
				.header("Authorization", headerValue))
			.andDo(print()).andExpect(status().isOk());
	}
	
	//save user bookmark API test
	@Test
	public void testSaveBookmark() throws Exception {
		//testing saving a bookmark
		MvcResult mvcResult = this.mockMvc.perform(post("/login")
				.content("{\"username\":\"user\", \"password\":\"user\"}")).andReturn();
		String headerValue = mvcResult.getResponse().getHeader("Authorization");
		
		this.mockMvc.perform(post("/user/user/create-bookmark")
				.header("Authorization", headerValue)
				.content("{\"title\":\"bookmarktitle\","
						+ "\"description\":\"bookmarkdescription\","
						+ "\"sourceName\":\"bookmarksource\","
						+ "\"publishedAt\":\"bookmarkdate\","
						+ "\"url\":\"bookmarkurl\"}"))
			.andDo(print()).andExpect(status().isOk());
	}
	
	//delete user bookmark API test
	@Test
	public void testDeleteBookmark() throws Exception {
		//testing deleting a bookmark
		MvcResult mvcResult = this.mockMvc.perform(post("/login")
				.content("{\"username\":\"user\", \"password\":\"user\"}")).andReturn();
		String headerValue = mvcResult.getResponse().getHeader("Authorization");
		
		this.mockMvc.perform(delete("/user/user/delete-bookmark")
				.header("Authorization", headerValue)
				.content("{\"title\":\"bookmarktitle\","
						+ "\"description\":\"bookmarkdescription\","
						+ "\"sourceName\":\"bookmarksource\","
						+ "\"publishedAt\":\"bookmarkdate\","
						+ "\"url\":\"bookmarkurl\"}"))
		.andDo(print()).andExpect(status().isOk());
	}
}
