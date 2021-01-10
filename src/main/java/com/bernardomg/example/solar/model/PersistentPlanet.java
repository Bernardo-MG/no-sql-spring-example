
package com.bernardomg.example.solar.model;

import java.util.List;

import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;
import org.springframework.data.neo4j.core.schema.Relationship.Direction;

import com.google.common.base.MoreObjects;

@Node("Planet")
public final class PersistentPlanet implements Planet {

    // private Iterable<Info> info;

    @Relationship(type = "INFORMATION", direction = Direction.OUTGOING)
    private List<PersistentInfo> info;

    @Id
    private String               name;

    private Long                 position;

    public PersistentPlanet() {
        super();
    }

    public List<PersistentInfo> getInfo() {
        return info;
    }

    @Override
    public final String getName() {
        return name;
    }

    @Override
    public Long getPosition() {
        return position;
    }

    public void setInfo(final List<PersistentInfo> info) {
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
        return MoreObjects.toStringHelper(this).add("name", name)
                .add("info", info).toString();
    }

}
