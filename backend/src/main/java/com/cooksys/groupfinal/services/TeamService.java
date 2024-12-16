package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.TeamDto;

public interface TeamService {

	TeamDto createTeamInCompany(Long companyId, CredentialsDto credentialsDto, TeamDto teamDto);

}
