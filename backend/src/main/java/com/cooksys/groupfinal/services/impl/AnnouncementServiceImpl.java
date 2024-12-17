package com.cooksys.groupfinal.services.impl;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.dtos.AnnouncementRequestDto;
import com.cooksys.groupfinal.entities.Announcement;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.AnnouncementMapper;
import com.cooksys.groupfinal.repositories.AnnouncementRepository;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.AnnouncementService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AnnouncementServiceImpl implements AnnouncementService {
	private final CompanyRepository companyRepository;
	private final UserRepository userRepository;
	private final AnnouncementMapper announcementMapper;
	private final AnnouncementRepository announcementRepository;
	
	@Override
	public AnnouncementDto createAnnouncement(Long companyId, Long userId, AnnouncementRequestDto announcementRequestDto) {
		Optional<Company> company = companyRepository.findById(companyId);
        if (company.isEmpty()) {
            throw new NotFoundException("Unexpected error with company id: log back in");
        }
        
        Optional<User> user = userRepository.findById(userId);
		if(user.isEmpty()) {
			throw new NotFoundException("Unexpected error with user id: log back in");
		} else if(!user.get().isAdmin()) {
			throw new BadRequestException("User is not an admin. Only admins can create an announcement");
		} 
		
		if(!company.get().getEmployees().contains(user.get())) {
			throw new BadRequestException("Admin does not have admin privileges for this company");
		}
		
		Announcement announcement = announcementMapper.requestDtoToEntity(announcementRequestDto);
		announcement.setAuthor(user.get());
		announcement.setCompany(company.get());
		return announcementMapper.entityToDto(announcementRepository.saveAndFlush(announcement));
	}

}