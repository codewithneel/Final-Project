package com.cooksys.groupfinal.services.impl;

import java.util.Objects;
import java.util.Optional;

import com.cooksys.groupfinal.dtos.ProfileDto;
import com.cooksys.groupfinal.dtos.UserRequestDto;
import com.cooksys.groupfinal.mappers.BasicUserMapper;
import com.cooksys.groupfinal.mappers.ProfileMapper;
import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.entities.Credentials;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotAuthorizedException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.CredentialsMapper;
import com.cooksys.groupfinal.mappers.FullUserMapper;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
  private final FullUserMapper fullUserMapper;
  private final BasicUserMapper basicUserMapper;
	private final CredentialsMapper credentialsMapper;
    private final ProfileMapper profileMapper;

    private void credentialsErrorChecking(CredentialsDto credentialsDto) {
        if (credentialsDto == null || credentialsDto.getUsername() == null || credentialsDto.getPassword() == null) {
            throw new BadRequestException("A username and password are required.");
        }
    }


    private boolean validateUsername(String username) {
        Optional<User> user = userRepository.findByCredentialsUsername(username);
        return user.isPresent();
    }

    private User findUser(String username) {
        Optional<User> user = userRepository.findByCredentialsUsernameAndActiveTrue(username);
        if (user.isEmpty()) {
            throw new NotFoundException("The username provided does not belong to an active user.");
        }
        return user.get();
    }
	
	@Override
	public FullUserDto login(CredentialsDto credentialsDto) {
		if (credentialsDto == null || credentialsDto.getUsername() == null || credentialsDto.getPassword() == null) {
            throw new BadRequestException("A username and password are required.");
        }
        Credentials credentialsToValidate = credentialsMapper.dtoToEntity(credentialsDto);
        User userToValidate = findUser(credentialsDto.getUsername());
        if (!userToValidate.getCredentials().equals(credentialsToValidate)) {
            throw new NotAuthorizedException("The provided credentials are invalid.");
        }
        if (userToValidate.getStatus().equals("PENDING")) {
        	userToValidate.setStatus("JOINED");
        	userRepository.saveAndFlush(userToValidate);
        }
        return fullUserMapper.entityToFullUserDto(userToValidate);
	}

    @Override
    public FullUserDto createUser(UserRequestDto userRequestDto) {
        credentialsErrorChecking(userRequestDto.getCredentials());
        if (validateUsername(userRequestDto.getCredentials().getUsername())) {
            throw new BadRequestException("A user with this username already exists.");
        }
        User newUser = basicUserMapper.requestDtoToEntity(userRequestDto);
        newUser.setActive(true);
        return fullUserMapper.entityToFullUserDto(userRepository.saveAndFlush(newUser));
    }

    @Override
    public FullUserDto patchUserProfile(String username, ProfileDto profileDto) {
        User user = findUser(username);
        user.setProfile(profileMapper.dtoToEntity(profileDto));
        return fullUserMapper.entityToFullUserDto(userRepository.saveAndFlush(user));
    }

    @Override
    public FullUserDto patchUserCredentials(String username, CredentialsDto credentialsDto) {
        credentialsErrorChecking(credentialsDto);
        User user = findUser(username);
        if (!Objects.equals(username, credentialsDto.getUsername()) && validateUsername(credentialsDto.getUsername())) {
            throw new BadRequestException("A user with the newly entered username already exists.");
        }
        user.setCredentials(credentialsMapper.dtoToEntity(credentialsDto));
        return fullUserMapper.entityToFullUserDto(userRepository.saveAndFlush(user));
    }

    @Override
    public FullUserDto patchUserAdmin(String username, boolean adminStatus) {
        User user = findUser(username);
        user.setAdmin(adminStatus);
        return fullUserMapper.entityToFullUserDto(userRepository.saveAndFlush(user));
    }

    @Override
    public FullUserDto patchUserActive(String username, boolean activeStatus) {
        Optional<User> user = userRepository.findByCredentialsUsername(username);
        if (user.isEmpty()) {
            throw new NotFoundException("The username provided does not belong to an active user.");
        }
        user.get().setActive(activeStatus);
        return fullUserMapper.entityToFullUserDto(userRepository.saveAndFlush(user.get()));
    }

    @Override
    public FullUserDto getUser(String username) {
        return fullUserMapper.entityToFullUserDto(findUser(username));
    }
}
