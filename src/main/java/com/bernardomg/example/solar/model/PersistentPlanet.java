
package com.bernardomg.example.solar.model;

import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;

import com.google.common.base.MoreObjects;

@NodeEntity
public final class PersistentPlanet implements Planet {

    @Id
    @GeneratedValue
    private Long           id;

    private Iterable<Info> info;

    private String         name;

    public PersistentPlanet() {
        super();
    }

    public Long getId() {
        return id;
    }

    @Override
    public final Iterable<Info> getInfo() {
        return info;
    }

    @Override
    public final String getName() {
        return name;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public final void setInfo(final Iterable<Info> info) {
        this.info = info;
    }

    public final void setName(final String name) {
        this.name = name;
    }

    @Override
    public final String toString() {
        return MoreObjects.toStringHelper(this).add("id", id).add("name", name)
                .add("info", info).toString();
    }

}
