
package com.bernardomg.example.solar.service;

import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bernardomg.example.solar.model.Planet;
import com.bernardomg.example.solar.repository.PlanetRepository;

@Service
public final class DefaultPlanetService implements PlanetService {

    private final PlanetRepository repository;

    @Autowired
    public DefaultPlanetService(final PlanetRepository repo) {
        super();

        repository = repo;
    }

    @Override
    public Planet getPlanet(final String planet) {
        return StreamSupport.stream(getPlanets().spliterator(), false)
                .filter((p) -> planet.equalsIgnoreCase(p.getName())).findFirst()
                .get();
    }

    @Override
    public final Iterable<? extends Planet> getPlanets() {
        // TODO: Add sorting. And sort by distance from the sun
        return repository.findAll();
    }

}
