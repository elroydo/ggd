package com.ggdspringback.ggd.domain;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ggdspringback.ggd.entity.Result;
import com.ggdspringback.ggd.entity.User;

@Repository
public interface ResultRepository extends CrudRepository<Result, Long> {
	List<Result> findByUsers(User user);
}
