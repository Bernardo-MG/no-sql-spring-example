
package com.bernardomg.example.solar.repository;

import org.springframework.data.neo4j.repository.Neo4jRepository;

import com.bernardomg.example.solar.model.Planet;

public interface PlanetRepository extends Neo4jRepository<Planet, Long> {

}
