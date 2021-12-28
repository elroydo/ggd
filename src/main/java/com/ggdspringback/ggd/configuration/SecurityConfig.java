package com.ggdspringback.ggd.configuration;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.ggdspringback.ggd.filter.AuthenticationFilter;
import com.ggdspringback.ggd.filter.LoginFilter;
import com.ggdspringback.ggd.service.UserDetailsServiceImpl;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter{
	@Autowired
	private UserDetailsServiceImpl userDetailsService;
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		//http.csrf().disable().cors().configurationSource(corsConfigurationSource()).and().authorizeRequests().anyRequest().permitAll(); //permit all access
		http.csrf().disable().cors().and().authorizeRequests() //.configurationSource(corsConfigurationSource())
			.antMatchers(HttpMethod.GET, "/chat", "/actions").permitAll()
			.antMatchers(HttpMethod.POST, "/login", "/register").permitAll()

			
				.anyRequest().authenticated()
				.and()
				//filter for login requests
				.addFilterBefore(new LoginFilter("/login", authenticationManager()),
					UsernamePasswordAuthenticationFilter.class)
				//filter for other requests, checking for jwt in header
				.addFilterBefore(new AuthenticationFilter(),
					UsernamePasswordAuthenticationFilter.class);
	}
	
	@Bean //t~i~t~wind
	CorsConfigurationSource corsConfigurationSource() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(Arrays.asList("*")); //spring boot upgrade to 2.4.* -- not possible, use allowedOriginPatterns instead~~
		configuration.setAllowedMethods(Arrays.asList("*"));
		configuration.setAllowedHeaders(Arrays.asList("*"));
		//configuration.setAllowCredentials(true); //this f~s~l
		configuration.applyPermitDefaultValues();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}
	
	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(new BCryptPasswordEncoder());
	}
}