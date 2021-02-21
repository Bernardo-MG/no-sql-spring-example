/**
 * The MIT License (MIT)
 * <p>
 * Copyright (c) 2021 the original author or authors.
 * <p>
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * <p>
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * <p>
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

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
