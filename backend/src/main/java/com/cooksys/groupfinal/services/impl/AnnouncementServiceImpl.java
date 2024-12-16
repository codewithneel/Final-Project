package com.cooksys.groupfinal.services.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.entities.Announcement;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.mappers.AnnouncementMapper;
import com.cooksys.groupfinal.repositories.AnnouncementRepository;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.services.AnnouncementService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AnnouncementServiceImpl implements AnnouncementService {
	private final AnnouncementRepository announcementRepository;
	private final AnnouncementMapper announcementMapper;

	private final CompanyRepository companyRepository;

	@Override
	public Set<AnnouncementDto> getAnnouncementsForCompany(Long companyId) {
		Optional<Company> optionalCompany = companyRepository.findById(companyId);

		if (optionalCompany.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No Company found with id: " + companyId);
		}

		Company foundCompany = optionalCompany.get();

		Set<Announcement> allAnnouncements = foundCompany.getAnnouncements();

		return announcementMapper.entitiesToDtos(allAnnouncements);
	}

}