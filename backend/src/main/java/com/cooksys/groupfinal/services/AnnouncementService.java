package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.AnnouncementDto;

public interface AnnouncementService {

	Set<AnnouncementDto> getAnnouncementsForCompany(Long companyId);

}
