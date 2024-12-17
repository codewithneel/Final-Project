package com.cooksys.groupfinal.services.impl;

import java.util.Optional;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.Project;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.mappers.ProjectMapper;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.repositories.ProjectRepository;
import com.cooksys.groupfinal.repositories.TeamRepository;
import com.cooksys.groupfinal.services.ProjectService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService
{
	private final CompanyRepository companyRepository;

	private final TeamRepository teamRepository;

	
	private final ProjectRepository projectRepository;
	private final ProjectMapper projectMapper;
	


	Company checkCompanyExists(Long companyId) {
		Optional<Company> optionalCompany = companyRepository.findById(companyId);

		if (optionalCompany.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No Company found with id: " + companyId);
		}

		return optionalCompany.get();
	}
	
	Team checkTeamExists(Long teamId, Set<Team> compTeams)
	{
		Team foundTeam=null;
		for(Team team : compTeams)
		{
			if(team.getId()==teamId)
			{
				foundTeam=team;
			}
		}
		
		
		if (foundTeam==null) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No Team found with id: " + teamId);
		}
		
		return foundTeam;
		
	}

	
	
	@Override
	public ProjectDto addProjectToTeam(Long companyId, Long teamId, ProjectDto projectDto)
	{
		Company foundCompany = checkCompanyExists(companyId);
		
		
		Set<Team> compTeams=foundCompany.getTeams();
		
		Team foundTeam=checkTeamExists(teamId,compTeams);
		
		if (projectDto == null || projectDto.getName() == null || projectDto.getDescription() == null || projectDto.getTeam() == null ) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Make sure you fill out all the Project fields");
		}
		
		Project newProject= projectMapper.dtoToEntity(projectDto);
		
		newProject=projectRepository.saveAndFlush(newProject);
		
		foundTeam.getProjects().add(newProject);
		teamRepository.saveAndFlush(foundTeam);
		
		
		return projectMapper.entityToDto(projectRepository.saveAndFlush(newProject));
		
	}

	@Override
	public ProjectDto updateProjectToTeam(Long companyId, Long teamId,ProjectDto projectDto) 
	{
		Company foundCompany = checkCompanyExists(companyId);
		
		Set<Team> compTeams= foundCompany.getTeams();
		
		Team foundTeam=checkTeamExists(teamId,compTeams);
		
		if (projectDto == null || projectDto.getName() == null || projectDto.getDescription() == null || projectDto.getTeam() == null ) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Make sure you fill out all the Project fields");
		}
		
		Project updatedProject= projectMapper.dtoToEntity(projectDto);
		
		Optional<Project> optionalProject = projectRepository.findById(projectDto.getId());
		
		if (optionalProject.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No Project found with id: " + teamId);
		}
		
		Project projectToUpdate=optionalProject.get();
		projectToUpdate.setName(updatedProject.getName());
		projectToUpdate.setDescription(updatedProject.getDescription());
		projectToUpdate.setActive(updatedProject.isActive());
		projectToUpdate.setTeam(updatedProject.getTeam());
		
		updatedProject= projectRepository.saveAndFlush(updatedProject);
		
		foundTeam.getProjects().add(updatedProject);
		teamRepository.saveAndFlush(foundTeam);
		
		return projectMapper.entityToDto(projectRepository.saveAndFlush(updatedProject));
	}
	
	

}
