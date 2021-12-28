package com.ggdspringback.ggd.domain;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ggdspringback.ggd.entity.Message;
import com.ggdspringback.ggd.entity.User;

@Repository
public interface MessageRepository extends CrudRepository<Message, Long> {
	List<Message> findByUsers(User user);
}
