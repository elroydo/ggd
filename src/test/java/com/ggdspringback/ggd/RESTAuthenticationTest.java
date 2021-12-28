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
public class RESTAuthenticationTest {
	@Autowired
	private MockMvc mockMvc;
	
	//general authentication API test
	@Test
	public void testAuthentication() throws Exception {
		//testing authentication with correct credentials
		this.mockMvc.perform(post("/login")
				.content("{\"username\":\"user\", \"password\":\"user\"}")).
		andDo(print()).andExpect(status().isOk());
		//testing authentication with incorrect credentials
		this.mockMvc.perform(post("/login")
				.content("{\"username\":\"admin\", \"password\":\"incorrectpassword\"}")).
		andDo(print()).andExpect(status().is4xxClientError());
	}
	
	//JWTauthentication API test
	@Test
	public void testJWTAuthentication() throws Exception {
		//testing JWT authentication bearer key response
		MvcResult mvcResult = this.mockMvc.perform(post("/login")
				.content("{\"username\":\"user\", \"password\":\"user\"}")).andReturn();
		String headerValue = mvcResult.getResponse().getHeader("Authorization");
		assertThat(headerValue).isNotEqualTo(null);
	}
}
