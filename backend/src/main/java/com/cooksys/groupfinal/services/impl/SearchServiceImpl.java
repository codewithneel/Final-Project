package com.cooksys.groupfinal.services.impl;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.BasicUserMapper;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.SearchService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService {
	
	private final UserRepository userRepository;
	private final BasicUserMapper basicUserMapper;
	
	@Override
	public BasicUserDto searchUser(String email) {
		Optional<User> user = userRepository.findByProfileEmail(email);
		if(user.isEmpty()) {
			throw new NotFoundException("User does not exist in db");
		}
		return basicUserMapper.entityToBasicUserDto(user.get());
	}
}
