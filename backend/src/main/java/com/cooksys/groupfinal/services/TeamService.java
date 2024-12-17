package com.cooksys.groupfinal.services;


import java.util.Set;

import com.cooksys.groupfinal.dtos.TeamDto;

public interface TeamService {

	TeamDto createTeamInCompany(Long companyId, TeamDto teamDto);

	 Set<TeamDto> getTeamsInCompany(Long companyId);

	

}
