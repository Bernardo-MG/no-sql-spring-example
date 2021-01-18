
package com.bernardomg.example.solar.model;

public interface Planet {

    public Iterable<? extends Moon> getSatellites();

    public String getName();

    public Long getPosition();

}
