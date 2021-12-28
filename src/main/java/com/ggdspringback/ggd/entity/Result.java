package com.ggdspringback.ggd.entity;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name="result")
public class Result {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(nullable = false, updatable = false)
	private long resultId;
	@Column(nullable = false)
	private float resultTonnes, emissionOne, emissionTwo, emissionThree, emissionFour, emissionFive;
	@Column(nullable = false, updatable = false)
	private String dateCompleted;
	
	public Result() {}
	public Result(float resultTonnes, float emissionOne, float emissionTwo, float emissionThree, float emissionFour, float emissionFive, String dateCompleted) {
		super();
		this.resultTonnes = resultTonnes;
		this.emissionOne = emissionOne;
		this.emissionTwo = emissionTwo;
		this.emissionThree = emissionThree;
		this.emissionFour = emissionFour;
		this.emissionFive = emissionFive;
		this.dateCompleted = dateCompleted;
	}
	
	@ManyToMany(mappedBy = "results", cascade = CascadeType.ALL)
	private Set<User> users;
	
	public void addResultUser(User user) {
		users.add(user);
	}
	
	public long getresultId() {
		return resultId;
	}
	public void setresultd(long resultId) {
		this.resultId = resultId;
	}
	public float getResultTonnes() {
		return resultTonnes;
	}
	public void setResultTonnes(float resultTonnes) {
		this.resultTonnes = resultTonnes;
	}
	public float getEmissionOne() {
		return emissionOne;
	}
	public void setEmissionOne(float emissionOne) {
		this.emissionOne = emissionOne;
	}
	public float getEmissionTwo() {
		return emissionTwo;
	}
	public void setEmissionTwo(float emissionTwo) {
		this.emissionTwo = emissionTwo;
	}
	public float getEmissionThree() {
		return emissionThree;
	}
	public void setEmissionThree(float emissionThree) {
		this.emissionThree = emissionThree;
	}
	public float getEmissionFour() {
		return emissionFour;
	}
	public void setEmissionFour(float emissionFour) {
		this.emissionFour = emissionFour;
	}
	public float getEmissionFive() {
		return emissionFive;
	}
	public void setEmissionFive(float emissionFive) {
		this.emissionFive = emissionFive;
	}
	public String getdateCompleted() {
		return dateCompleted;
	}
	public void setdateCompleted(String dateCompleted) {
		this.dateCompleted = dateCompleted;
	}
}
