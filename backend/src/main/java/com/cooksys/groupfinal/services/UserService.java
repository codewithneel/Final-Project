package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.ProfileDto;
import com.cooksys.groupfinal.dtos.UserRequestDto;

public interface UserService {

	FullUserDto login(CredentialsDto credentialsDto);


    FullUserDto createUser(UserRequestDto userRequestDto);

    FullUserDto patchUserProfile(String username, ProfileDto profileDto);

    FullUserDto patchUserCredentials(String username, CredentialsDto credentialsDto);

    FullUserDto patchUserAdmin(String username, boolean adminStatus);

    FullUserDto patchUserActive(String username, boolean activeStatus);

    FullUserDto getUser(String username);
}
