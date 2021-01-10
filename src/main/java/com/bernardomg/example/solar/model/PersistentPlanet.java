
package com.bernardomg.example.solar.model;

import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

import com.google.common.base.MoreObjects;

@Node("Planet")
public final class PersistentPlanet implements Planet {

    // private Iterable<Info> info;

    @Id
    private String name;

    private Long   position;

    public PersistentPlanet() {
        super();
    }

    // @Override
    // public final Iterable<Info> getInfo() {
    // return info;
    // }

    @Override
    public final String getName() {
        return name;
    }

    @Override
    public Long getPosition() {
        return position;
    }

    // public final void setInfo(final Iterable<Info> info) {
    // this.info = info;
    // }

    public final void setName(final String name) {
        this.name = name;
    }

    public void setPosition(final Long position) {
        this.position = position;
    }

    @Override
    public final String toString() {
        return MoreObjects.toStringHelper(this).add("name", name).toString();
        // .add("info", info).toString();
    }

}
