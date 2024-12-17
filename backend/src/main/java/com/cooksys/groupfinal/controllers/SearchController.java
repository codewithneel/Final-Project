package com.cooksys.groupfinal.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.services.SearchService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/search")
@RequiredArgsConstructor
public class SearchController {
	
	private final SearchService searchService;
	
	@GetMapping("/user/{email}")
	public BasicUserDto searchUser(@PathVariable String email) {
		return searchService.searchUser(email);
	}
	
	
}
