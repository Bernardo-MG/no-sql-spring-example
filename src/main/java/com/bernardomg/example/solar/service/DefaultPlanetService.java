
package com.bernardomg.example.solar.service;

import java.util.Collection;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bernardomg.example.solar.model.DefaultPlanet;
import com.bernardomg.example.solar.model.Info;
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
        final Collection<DefaultPlanet> planets;
        final Collection<Info> info;
        final DefaultPlanet planet;

        // planets = new ArrayList<>();
        //
        // planet = new DefaultPlanet();
        // planet.setName("Mercury");
        //
        // info = new ArrayList<>();
        // info.add(new DefaultInfo("tilt", "Tilt", 0.03));
        // info.add(new DefaultInfo("radius", "Radius", 2439.7));
        // info.add(new DefaultInfo("period", "Period", 58.65));
        // planet.setInfo(info);
        //
        // planets.add(planet);
        //
        // planet = new DefaultPlanet();
        // planet.setName("Venus");
        //
        // info = new ArrayList<>();
        // info.add(new DefaultInfo("tilt", "Tilt", 2.64));
        // info.add(new DefaultInfo("radius", "Radius", 6051.8));
        // info.add(new DefaultInfo("period", "Period", -243));
        // planet.setInfo(info);
        //
        // planets.add(planet);
        //
        // planet = new DefaultPlanet();
        // planet.setName("Earth");
        //
        // info = new ArrayList<>();
        // info.add(new DefaultInfo("tilt", "Tilt", 23.44));
        // info.add(new DefaultInfo("radius", "Radius", 6371));
        // info.add(new DefaultInfo("period", "Period", 1));
        // planet.setInfo(info);
        //
        // planets.add(planet);
        //
        // planet = new DefaultPlanet();
        // planet.setName("Mars");
        //
        // info = new ArrayList<>();
        // info.add(new DefaultInfo("tilt", "Tilt", 6.68));
        // info.add(new DefaultInfo("radius", "Radius", 3389.5));
        // info.add(new DefaultInfo("period", "Period", 1.03));
        // planet.setInfo(info);
        //
        // planets.add(planet);
        //
        // planet = new DefaultPlanet();
        // planet.setName("Jupiter");
        //
        // info = new ArrayList<>();
        // info.add(new DefaultInfo("tilt", "Tilt", 25.19));
        // info.add(new DefaultInfo("radius", "Radius", 69911));
        // info.add(new DefaultInfo("period", "Period", 0.41));
        // planet.setInfo(info);
        //
        // planets.add(planet);
        //
        // planet = new DefaultPlanet();
        // planet.setName("Saturn");
        //
        // info = new ArrayList<>();
        // info.add(new DefaultInfo("tilt", "Tilt", 26.73));
        // info.add(new DefaultInfo("radius", "Radius", 58232));
        // info.add(new DefaultInfo("period", "Period", 0.44));
        // planet.setInfo(info);
        //
        // planets.add(planet);
        //
        // planet = new DefaultPlanet();
        // planet.setName("Uranus");
        //
        // info = new ArrayList<>();
        // info.add(new DefaultInfo("tilt", "Tilt", 82.23));
        // info.add(new DefaultInfo("radius", "Radius", 25362));
        // info.add(new DefaultInfo("period", "Period", -0.72));
        // planet.setInfo(info);
        //
        // planets.add(planet);
        //
        // planet = new DefaultPlanet();
        // planet.setName("Neptune");
        //
        // info = new ArrayList<>();
        // info.add(new DefaultInfo("tilt", "Tilt", 28.32));
        // info.add(new DefaultInfo("radius", "Radius", 24622));
        // info.add(new DefaultInfo("period", "Period", 0.72));
        // planet.setInfo(info);
        //
        // planets.add(planet);

        // return planets;

        return repository.findAll();
    }

}
