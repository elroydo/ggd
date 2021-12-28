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
public class RESTUserTest {
	@Autowired
	private MockMvc mockMvc;
	
	//get user details API test
	@Test
	public void testGetUserDetails() throws Exception {
		//testing fetching user details
		MvcResult mvcResult = this.mockMvc.perform(post("/login")
				.content("{\"username\":\"user\", \"password\":\"user\"}")).andReturn();
		String headerValue = mvcResult.getResponse().getHeader("Authorization");
		
		this.mockMvc.perform(get("/user/user")
				.header("Authorization", headerValue))
			.andDo(print()).andExpect(status().isOk());
	}
	
	//register new user API test
	@Test
	public void testRegisterUser() throws Exception {
		//testing the registration of a new user
		this.mockMvc.perform(post("/register")
				.content("{\"username\":\"userusername\","
						+ "\"email\":\"useremail\","
						+ "\"password\":\"userpassword\","
						+ "\"forename\":\"userforename\","
						+ "\"surname\":\"usersurname\","
						+ "\"role\":\"USER\"}"))
		.andDo(print()).andExpect(status().isOk());
	}
	
	//delete user API test
	@Test
	public void testDeleteUser() throws Exception {
		//testing deleting a user
		MvcResult mvcResult = this.mockMvc.perform(post("/login")
				.content("{\"username\":\"user\", \"password\":\"user\"}")).andReturn();
		String headerValue = mvcResult.getResponse().getHeader("Authorization");
		
		this.mockMvc.perform(delete("/user/delete/user")
				.header("Authorization", headerValue))
			.andDo(print()).andExpect(status().isOk());
	}
}
