package com.cooksys.groupfinal.mappers;

import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.entities.Project;
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
public class ProjectMapperImpl implements ProjectMapper {

    @Autowired
    private TeamMapper teamMapper;

    @Override
    public ProjectDto entityToDto(Project project) {
        if ( project == null ) {
            return null;
        }

        ProjectDto projectDto = new ProjectDto();

        projectDto.setId( project.getId() );
        projectDto.setName( project.getName() );
        projectDto.setDescription( project.getDescription() );
        projectDto.setActive( project.isActive() );
        projectDto.setTeam( teamMapper.entityToDto( project.getTeam() ) );

        return projectDto;
    }

    @Override
    public Set<ProjectDto> entitiesToDtos(Set<Project> projects) {
        if ( projects == null ) {
            return null;
        }

        Set<ProjectDto> set = new HashSet<ProjectDto>( Math.max( (int) ( projects.size() / .75f ) + 1, 16 ) );
        for ( Project project : projects ) {
            set.add( entityToDto( project ) );
        }

        return set;
    }

    @Override
    public Project dtoToEntity(ProjectDto projectDto) {
        if ( projectDto == null ) {
            return null;
        }

        Project project = new Project();

        project.setId( projectDto.getId() );
        project.setName( projectDto.getName() );
        project.setDescription( projectDto.getDescription() );
        project.setActive( projectDto.isActive() );
        project.setTeam( teamMapper.dtoToEntity( projectDto.getTeam() ) );

        return project;
    }
}
