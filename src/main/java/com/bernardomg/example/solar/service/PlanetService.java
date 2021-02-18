
package com.bernardomg.example.solar.service;

import com.bernardomg.example.solar.model.Planet;

public interface PlanetService {

    public Planet getPlanet(final String planet);

    public Iterable<? extends Planet> getPlanets();

}
