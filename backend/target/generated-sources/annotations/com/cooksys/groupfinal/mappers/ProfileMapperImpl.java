package com.cooksys.groupfinal.mappers;

import com.cooksys.groupfinal.dtos.ProfileDto;
import com.cooksys.groupfinal.entities.Profile;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-12-18T02:33:06-0500",
    comments = "version: 1.4.1.Final, compiler: javac, environment: Java 21.0.5 (Oracle Corporation)"
)
@Component
public class ProfileMapperImpl implements ProfileMapper {

    @Override
    public Profile dtoToEntity(ProfileDto profileDto) {
        if ( profileDto == null ) {
            return null;
        }

        Profile profile = new Profile();

        profile.setFirstName( profileDto.getFirstName() );
        profile.setLastName( profileDto.getLastName() );
        profile.setEmail( profileDto.getEmail() );
        profile.setPhone( profileDto.getPhone() );

        return profile;
    }

    @Override
    public ProfileDto entityToDto(Profile profile) {
        if ( profile == null ) {
            return null;
        }

        ProfileDto profileDto = new ProfileDto();

        profileDto.setFirstName( profile.getFirstName() );
        profileDto.setLastName( profile.getLastName() );
        profileDto.setEmail( profile.getEmail() );
        profileDto.setPhone( profile.getPhone() );

        return profileDto;
    }
}
