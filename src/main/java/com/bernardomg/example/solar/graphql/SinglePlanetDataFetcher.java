
package com.bernardomg.example.solar.graphql;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.bernardomg.example.solar.model.PersistentPlanet;
import com.bernardomg.example.solar.model.Planet;
import com.bernardomg.example.solar.repository.PlanetRepository;

import graphql.schema.DataFetcher;
import graphql.schema.DataFetchingEnvironment;

@Component
public final class SinglePlanetDataFetcher implements DataFetcher<Planet> {

    private static final Logger LOGGER = LoggerFactory
            .getLogger(SinglePlanetDataFetcher.class);

    @Autowired
    private PlanetRepository    planetRepository;

    public SinglePlanetDataFetcher() {
        super();
    }

    @Override
    public Planet get(final DataFetchingEnvironment environment)
            throws Exception {
        final Optional<PersistentPlanet> read;
        final Planet result;
        final String id;

        if (environment.getVariables().containsKey("id")) {
            id = environment.getVariables().get("id").toString();
            read = planetRepository.findById(id);
            if (read.isPresent()) {
                result = read.get();
            } else {
                LOGGER.error("Id {} is not present in DB", id);
                result = null;
            }
        } else {
            LOGGER.error("No id found");
            result = null;
        }

        return result;
    }

}
