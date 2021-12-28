package com.ggdspringback.ggd.domain;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ggdspringback.ggd.entity.ToDo;
import com.ggdspringback.ggd.entity.User;

@Repository
public interface ToDoRepository extends CrudRepository<ToDo, Long> {
	List<ToDo> findByUsers(User user);

	@Query("select c from ToDo c where c.description = ?1")
	ToDo findByDescription(String description);
}
