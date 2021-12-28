package com.ggdspringback.ggd.domain;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ggdspringback.ggd.entity.Action;
import com.ggdspringback.ggd.entity.User;

@Repository
public interface ActionRepository extends CrudRepository<Action, Long> {
	List<Action> findByUsers(User user);

	@Query("select c from Action c where c.title = ?1")
	Action findByTitle(String title);

	@Query("select c from Action c where c.createdBy = ?1")
	Action findByCreatedBy(String createdBy);
	
	@Query("select c from Action c where c.title = ?1 and c.createdBy = ?2")
	Action findByTitleAndCreatedBy(String title, String createdBy);

}
