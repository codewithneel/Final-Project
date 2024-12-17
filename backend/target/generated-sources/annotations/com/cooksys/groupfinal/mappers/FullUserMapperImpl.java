package com.cooksys.groupfinal.mappers;

import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.UserRequestDto;
import com.cooksys.groupfinal.entities.User;
import java.util.HashSet;
import java.util.Set;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-12-16T23:19:55-0600",
    comments = "version: 1.4.1.Final, compiler: javac, environment: Java 21.0.4 (Eclipse Adoptium)"
)
@Component
public class FullUserMapperImpl implements FullUserMapper {

    @Autowired
    private ProfileMapper profileMapper;
    @Autowired
    private CredentialsMapper credentialsMapper;
    @Autowired
    private CompanyMapper companyMapper;
    @Autowired
    private TeamMapper teamMapper;

    @Override
    public FullUserDto entityToFullUserDto(User user) {
        if ( user == null ) {
            return null;
        }

        FullUserDto fullUserDto = new FullUserDto();

        fullUserDto.setId( user.getId() );
        fullUserDto.setProfile( profileMapper.entityToDto( user.getProfile() ) );
        fullUserDto.setAdmin( user.isAdmin() );
        fullUserDto.setActive( user.isActive() );
        fullUserDto.setStatus( user.getStatus() );
        fullUserDto.setCompanies( companyMapper.entitiesToDtos( user.getCompanies() ) );
        fullUserDto.setTeams( teamMapper.entitiesToDtos( user.getTeams() ) );

        return fullUserDto;
    }

    @Override
    public Set<FullUserDto> entitiesToFullUserDtos(Set<User> users) {
        if ( users == null ) {
            return null;
        }

        Set<FullUserDto> set = new HashSet<FullUserDto>( Math.max( (int) ( users.size() / .75f ) + 1, 16 ) );
        for ( User user : users ) {
            set.add( entityToFullUserDto( user ) );
        }

        return set;
    }

    @Override
    public User requestDtoToEntity(UserRequestDto userRequestDto) {
        if ( userRequestDto == null ) {
            return null;
        }

        User user = new User();

        user.setCredentials( credentialsMapper.dtoToEntity( userRequestDto.getCredentials() ) );
        user.setProfile( profileMapper.dtoToEntity( userRequestDto.getProfile() ) );
        user.setAdmin( userRequestDto.isAdmin() );

        return user;
    }
}
