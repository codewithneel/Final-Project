package com.cooksys.groupfinal.controllers;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.dtos.AnnouncementRequestDto;
import com.cooksys.groupfinal.services.AnnouncementService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/announcements")
@RequiredArgsConstructor
public class AnnouncementController {
	
	private final AnnouncementService announcementService;
	
	@PostMapping("/company/{companyId}/user/{userId}")
	public AnnouncementDto createAnnouncement(@PathVariable Long companyId, @PathVariable Long userId, @RequestBody AnnouncementRequestDto announcementRequestDto) {
		return announcementService.createAnnouncement(companyId, userId, announcementRequestDto);
	}

}
