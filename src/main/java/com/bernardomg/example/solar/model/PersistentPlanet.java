
package com.bernardomg.example.solar.model;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

import com.google.common.base.MoreObjects;

@Node
public final class PersistentPlanet implements Planet {

    @Id
    @GeneratedValue
    private Long           id;

    private Iterable<Info> info;

    private String         name;

    private Long           position;

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

    public Long getPosition() {
        return position;
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

    public void setPosition(final Long position) {
        this.position = position;
    }

    @Override
    public final String toString() {
        return MoreObjects.toStringHelper(this).add("id", id).add("name", name)
                .add("info", info).toString();
    }

}
