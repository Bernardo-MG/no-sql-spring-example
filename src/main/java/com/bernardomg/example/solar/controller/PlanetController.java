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

package com.bernardomg.example.solar.controller;

import static com.google.common.base.Preconditions.checkNotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bernardomg.example.solar.model.Planet;
import com.bernardomg.example.solar.response.DefaultResponse;
import com.bernardomg.example.solar.response.Response;
import com.bernardomg.example.solar.service.PlanetService;

/**
 * Rest controller for the example entities.
 * 
 * @author Bernardo Mart&iacute;nez Garrido
 */
@RestController
@RequestMapping("/rest/planet")
public class PlanetController {

    /**
     * Planet service.
     */
    private final PlanetService planetService;

    /**
     * Constructs a controller with the specified dependencies.
     * 
     * @param service
     *            planet service
     */
    @Autowired
    public PlanetController(final PlanetService service) {
        super();

        planetService = checkNotNull(service,
                "Received a null pointer as service");
    }

    /**
     * Returns a single planet.
     * 
     * @param planet
     *            planet to search for
     * @return the planet searched for
     */
    @GetMapping("/{planet}")
    public Response<Planet>
            readPlanet(@PathVariable("planet") final String planet) {
        final Planet result;

        result = planetService.getPlanet(planet);

        return new DefaultResponse<>(result);
    }

    /**
     * Returns all the planets.
     * 
     * @return all the planets
     */
    @GetMapping
    public Response<Iterable<? extends Planet>> readPlanets() {
        final Iterable<? extends Planet> result;

        result = planetService.getPlanets();

        return new DefaultResponse<>(result);
    }

}
