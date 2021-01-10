
package com.bernardomg.example.solar.repository;

import org.springframework.data.neo4j.repository.Neo4jRepository;

import com.bernardomg.example.solar.model.PersistentPlanet;

public interface PlanetRepository
        extends Neo4jRepository<PersistentPlanet, Long> {

}
