package com.cooksys.groupfinal.services.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.dtos.CompanyDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.entities.Announcement;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.Project;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.AnnouncementMapper;
import com.cooksys.groupfinal.mappers.CompanyMapper;
import com.cooksys.groupfinal.mappers.ProjectMapper;
import com.cooksys.groupfinal.mappers.TeamMapper;
import com.cooksys.groupfinal.mappers.FullUserMapper;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.repositories.TeamRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.CompanyService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {
	
	private final UserRepository userRepository;
	private final CompanyRepository companyRepository;
	private final TeamRepository teamRepository;
	private final CompanyMapper companyMapper;
	private final FullUserMapper fullUserMapper;
	private final AnnouncementMapper announcementMapper;
	private final TeamMapper teamMapper;
	private final ProjectMapper projectMapper;
	
	private Company findCompany(Long id) {
        Optional<Company> company = companyRepository.findById(id);
        if (company.isEmpty()) {
            throw new NotFoundException("A company with the provided id does not exist.");
        }
        return company.get();
    }
	
	private Team findTeam(Long id) {
        Optional<Team> team = teamRepository.findById(id);
        if (team.isEmpty()) {
            throw new NotFoundException("A team with the provided id does not exist.");
        }
        return team.get();
    }
	
	private User findUser(Long id, String errorMsg) {
		Optional<User> user = userRepository.findById(id);
		if(user.isEmpty()) {
			throw new BadRequestException(errorMsg);
		}
		return user.get();
	}
	
	@Override
	public Set<FullUserDto> getAllUsers(Long id) {
		Company company = findCompany(id);
		Set<User> filteredUsers = new HashSet<>();
		company.getEmployees().forEach(filteredUsers::add);
		filteredUsers.removeIf(user -> !user.isActive());
		return fullUserMapper.entitiesToFullUserDtos(filteredUsers);
	}

	@Override
	public Set<AnnouncementDto> getAllAnnouncements(Long id) {
		Company company = findCompany(id);
		List<Announcement> sortedList = new ArrayList<Announcement>(company.getAnnouncements());
		sortedList.sort(Comparator.comparing(Announcement::getDate).reversed());
		Set<Announcement> sortedSet = new HashSet<Announcement>(sortedList);
		return announcementMapper.entitiesToDtos(sortedSet);
	}

	@Override
	public Set<TeamDto> getAllTeams(Long id) {
		Company company = findCompany(id);
		return teamMapper.entitiesToDtos(company.getTeams());
	}

	@Override
	public Set<ProjectDto> getAllProjects(Long companyId, Long teamId) {
		Company company = findCompany(companyId);
		Team team = findTeam(teamId);
		if (!company.getTeams().contains(team)) {
			throw new NotFoundException("A team with id " + teamId + " does not exist at company with id " + companyId + ".");
		}
		Set<Project> filteredProjects = new HashSet<>();
		team.getProjects().forEach(filteredProjects::add);
		filteredProjects.removeIf(project -> !project.isActive());
		return projectMapper.entitiesToDtos(filteredProjects);
	}

	@Override
	public Set<CompanyDto> getUserCompanies(Long userId) {
		User user = findUser(userId, "unexpected error: log back in");
		return companyMapper.entitiesToDtos(user.getCompanies());
	}

	@Override
	public void addUserToCompany(Long companyId, Long userId) {
		Company company = findCompany(companyId);
		User user = findUser(userId, "A user with the provided id does not exist");
		if(!company.getEmployees().contains(user)) {
			company.getEmployees().add(user);
			//user.getCompanies().add(company);
			companyRepository.saveAndFlush(company);
			//userRepository.saveAndFlush(user);	
		} else {
			throw new BadRequestException("User is an employee of this company");
		}
	}

}
