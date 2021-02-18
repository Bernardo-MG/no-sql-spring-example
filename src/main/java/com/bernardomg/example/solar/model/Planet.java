
package com.bernardomg.example.solar.model;

public interface Planet {

    public String getName();

    public Long getPosition();

    public Iterable<? extends Moon> getSatellites();

}
