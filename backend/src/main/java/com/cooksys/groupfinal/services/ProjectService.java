package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.ProjectDto;

public interface ProjectService {

	ProjectDto addProjectToTeam(Long companyId, Long teamId, ProjectDto projectDto);

	ProjectDto updateProjectToTeam(Long companyId, Long teamId, ProjectDto projectDto);

}
