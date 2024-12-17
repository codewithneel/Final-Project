package com.cooksys.groupfinal.controllers;

import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.services.ProjectService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectController
{
	
	private final ProjectService projectService;
	
	@PostMapping("/{companyid}/{teamId}/newProject")
	public ProjectDto addProjectToTeam(@PathVariable("companyid") Long companyId, @PathVariable("teamId") Long teamId, @RequestBody ProjectDto projectDto)
	{
		return projectService.addProjectToTeam(companyId,teamId,projectDto);
	}
	
	@PatchMapping("/{companyid}/{teamId}/updateProject")
	public ProjectDto updateProjectToTeam(@PathVariable("companyid") Long companyId, @PathVariable("teamId") Long teamId, @RequestBody ProjectDto projectDto)
	{
		return projectService.updateProjectToTeam(companyId, teamId, projectDto);
	}

}
