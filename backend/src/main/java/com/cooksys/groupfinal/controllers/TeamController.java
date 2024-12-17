package com.cooksys.groupfinal.controllers;

import java.util.Set;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.services.TeamService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/team")
@RequiredArgsConstructor
public class TeamController {
	
	private final TeamService teamService;
	
	
	@PostMapping("/{companyId}")
	public TeamDto createTeamInCompany(@PathVariable Long companyId,@RequestBody TeamDto teamDto)
	{
		return teamService.createTeamInCompany(companyId, teamDto);
	}
	
	@GetMapping("/{companyId}/teammates")
	public Set<TeamDto> getTeamsInCompany(@PathVariable Long companyId)
	{
		return teamService.getTeamsInCompany(companyId);
	}
	
	
	
	
	
	
}
