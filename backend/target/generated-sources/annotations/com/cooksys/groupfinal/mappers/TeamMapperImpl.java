package com.cooksys.groupfinal.mappers;

import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.dtos.ProfileDto;
import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.entities.Profile;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.entities.User;
import java.util.HashSet;
import java.util.Set;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-12-18T02:33:06-0500",
    comments = "version: 1.4.1.Final, compiler: javac, environment: Java 21.0.5 (Oracle Corporation)"
)
@Component
public class TeamMapperImpl implements TeamMapper {

    @Autowired
    private BasicUserMapper basicUserMapper;

    @Override
    public TeamDto entityToDto(Team team) {
        if ( team == null ) {
            return null;
        }

        TeamDto teamDto = new TeamDto();

        teamDto.setId( team.getId() );
        teamDto.setName( team.getName() );
        teamDto.setDescription( team.getDescription() );
        teamDto.setTeammates( basicUserMapper.entitiesToBasicUserDtos( team.getTeammates() ) );

        return teamDto;
    }

    @Override
    public Set<TeamDto> entitiesToDtos(Set<Team> teams) {
        if ( teams == null ) {
            return null;
        }

        Set<TeamDto> set = new HashSet<TeamDto>( Math.max( (int) ( teams.size() / .75f ) + 1, 16 ) );
        for ( Team team : teams ) {
            set.add( entityToDto( team ) );
        }

        return set;
    }

    @Override
    public Team dtoToEntity(TeamDto teamDto) {
        if ( teamDto == null ) {
            return null;
        }

        Team team = new Team();

        team.setId( teamDto.getId() );
        team.setName( teamDto.getName() );
        team.setDescription( teamDto.getDescription() );
        team.setTeammates( basicUserDtoSetToUserSet( teamDto.getTeammates() ) );

        return team;
    }

    protected Profile profileDtoToProfile(ProfileDto profileDto) {
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

    protected User basicUserDtoToUser(BasicUserDto basicUserDto) {
        if ( basicUserDto == null ) {
            return null;
        }

        User user = new User();

        user.setId( basicUserDto.getId() );
        user.setProfile( profileDtoToProfile( basicUserDto.getProfile() ) );
        user.setActive( basicUserDto.isActive() );
        user.setAdmin( basicUserDto.isAdmin() );
        user.setStatus( basicUserDto.getStatus() );

        return user;
    }

    protected Set<User> basicUserDtoSetToUserSet(Set<BasicUserDto> set) {
        if ( set == null ) {
            return null;
        }

        Set<User> set1 = new HashSet<User>( Math.max( (int) ( set.size() / .75f ) + 1, 16 ) );
        for ( BasicUserDto basicUserDto : set ) {
            set1.add( basicUserDtoToUser( basicUserDto ) );
        }

        return set1;
    }
}
