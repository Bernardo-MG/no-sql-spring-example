
package com.bernardomg.example.solar.model;

import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

import com.google.common.base.MoreObjects;

@Node("Info")
public final class PersistentInfo implements Info {

    private String id;

    @Id
    private Long   identifier;

    private String label;

    private Double value;

    public PersistentInfo() {
        super();
    }

    @Override
    public String getId() {
        return id;
    }

    public Long getIdentifier() {
        return identifier;
    }

    @Override
    public String getLabel() {
        return label;
    }

    @Override
    public Double getValue() {
        return value;
    }

    public void setId(final String id) {
        this.id = id;
    }

    public void setIdentifier(final Long identifier) {
        this.identifier = identifier;
    }

    public void setLabel(final String label) {
        this.label = label;
    }

    public void setValue(final Double value) {
        this.value = value;
    }

    @Override
    public final String toString() {
        return MoreObjects.toStringHelper(this).add("id", id)
                .add("label", label).add("value", value).toString();
    }

}
