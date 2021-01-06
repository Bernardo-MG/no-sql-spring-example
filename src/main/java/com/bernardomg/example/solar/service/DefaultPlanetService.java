
package com.bernardomg.example.solar.service;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.stereotype.Service;

import com.bernardomg.example.solar.model.DefaultPlanet;
import com.bernardomg.example.solar.model.Planet;

@Service
public final class DefaultPlanetService implements PlanetService {

    public DefaultPlanetService() {
        super();
    }

    @Override
    public final Iterable<? extends Planet> getPlanets() {
        final Collection<DefaultPlanet> planets;

        planets = new ArrayList<>();

        return planets;
    }

}
