package com.cooksys.groupfinal.mappers;

import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.entities.Credentials;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-12-18T02:33:06-0500",
    comments = "version: 1.4.1.Final, compiler: javac, environment: Java 21.0.5 (Oracle Corporation)"
)
@Component
public class CredentialsMapperImpl implements CredentialsMapper {

    @Override
    public Credentials dtoToEntity(CredentialsDto credentialsDto) {
        if ( credentialsDto == null ) {
            return null;
        }

        Credentials credentials = new Credentials();

        credentials.setUsername( credentialsDto.getUsername() );
        credentials.setPassword( credentialsDto.getPassword() );

        return credentials;
    }
}
