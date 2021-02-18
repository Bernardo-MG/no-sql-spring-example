
package com.bernardomg.example.solar.graphql;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.bernardomg.example.solar.model.Planet;
import com.bernardomg.example.solar.repository.PlanetRepository;

import graphql.schema.DataFetcher;
import graphql.schema.DataFetchingEnvironment;

@Component
public final class AllPlanetsDataFetcher
        implements DataFetcher<List<? extends Planet>> {

    @Autowired
    private PlanetRepository planetRepository;

    public AllPlanetsDataFetcher() {
        super();
    }

    @Override
    public List<? extends Planet> get(final DataFetchingEnvironment environment)
            throws Exception {
        return planetRepository.findAll();
    }

}
