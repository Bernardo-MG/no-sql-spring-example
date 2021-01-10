
package com.bernardomg.example.solar.model;

import com.google.common.base.MoreObjects;

public final class DefaultPlanet implements Planet {

    private Iterable<Info> info;

    private String         name;

    public DefaultPlanet() {
        super();
    }

    @Override
    public final Iterable<Info> getInfo() {
        return info;
    }

    @Override
    public final String getName() {
        return name;
    }

    public final void setInfo(final Iterable<Info> info) {
        this.info = info;
    }

    public final void setName(final String name) {
        this.name = name;
    }

    @Override
    public final String toString() {
        return MoreObjects.toStringHelper(this).add("name", name)
                .add("info", info).toString();
    }

}
