package com.cooksys.groupfinal.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.mappers.TeamMapper;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.repositories.TeamRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.TeamService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {
	private final CompanyRepository companyRepository;

	private final TeamRepository teamRepository;
	private final TeamMapper teamMapper;

	private final UserRepository userRepository;
	
	


	Company checkCompanyExists(Long companyId) {
		Optional<Company> optionalCompany = companyRepository.findById(companyId);

		if (optionalCompany.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No Company found with id: " + companyId);
		}

		return optionalCompany.get();
	}
	
	Team checkTeamExists(Long teamId)
	{
		Optional<Team> optionalTeam = teamRepository.findById(teamId); 
		
		if (optionalTeam.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No Team found with id: " + teamId);
		}
		
		return optionalTeam.get();
		
	}

	void checkCredentials(CredentialsDto credentialsDto) {
		if (credentialsDto == null || credentialsDto.getUsername() == null || credentialsDto.getPassword() == null) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Make sure you fill out all the credential fields");
		}

		List<User> allUsers = userRepository.findAll();
		User foundUser = null;

		for (User u : allUsers) {

			if ((u.getCredentials().getUsername().equals(credentialsDto.getUsername()) == true)
					&& (u.getCredentials().getPassword().equals(credentialsDto.getPassword()) == true)) {

				foundUser = u;

			}
		}

		if (foundUser == null && foundUser.isAdmin() && foundUser.isActive()) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid Credentials");
		}

	}

	@Override
	public TeamDto createTeamInCompany(Long companyId, TeamDto teamDto) {
		Company foundCompany = checkCompanyExists(companyId);

		if (teamDto == null || teamDto.getName() == null || teamDto.getDescription() == null) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Make sure you fill out all the Team fields");
		}

		Team newTeam = teamMapper.dtoToEntity(teamDto);
		newTeam.setCompany(foundCompany);
		newTeam=teamRepository.saveAndFlush(newTeam);
		
		foundCompany.getTeams().add(newTeam);
		companyRepository.saveAndFlush(foundCompany);

		return teamMapper.entityToDto(teamRepository.saveAndFlush(newTeam));

	}

	@Override
	public Set<TeamDto> getTeamsInCompany(Long companyId)
	{
		Company foundCompany = checkCompanyExists(companyId);
		
		Set<Team> allTeams=foundCompany.getTeams();
		
		return teamMapper.entitiesToDtos(allTeams);
	
	}

	

}
