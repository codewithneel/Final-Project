package com.cooksys.groupfinal.mappers;

import com.cooksys.groupfinal.dtos.BasicUserDto;
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
public class BasicUserMapperImpl implements BasicUserMapper {

    @Autowired
    private ProfileMapper profileMapper;
    @Autowired
    private CredentialsMapper credentialsMapper;

    @Override
    public BasicUserDto entityToBasicUserDto(User user) {
        if ( user == null ) {
            return null;
        }

        BasicUserDto basicUserDto = new BasicUserDto();

        basicUserDto.setId( user.getId() );
        basicUserDto.setProfile( profileMapper.entityToDto( user.getProfile() ) );
        basicUserDto.setAdmin( user.isAdmin() );
        basicUserDto.setActive( user.isActive() );
        basicUserDto.setStatus( user.getStatus() );

        return basicUserDto;
    }

    @Override
    public Set<BasicUserDto> entitiesToBasicUserDtos(Set<User> users) {
        if ( users == null ) {
            return null;
        }

        Set<BasicUserDto> set = new HashSet<BasicUserDto>( Math.max( (int) ( users.size() / .75f ) + 1, 16 ) );
        for ( User user : users ) {
            set.add( entityToBasicUserDto( user ) );
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
