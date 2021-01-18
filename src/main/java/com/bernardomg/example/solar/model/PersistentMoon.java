
package com.bernardomg.example.solar.model;

import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

@Node("Moon")
public class PersistentMoon implements Moon {

    @Id
    private String name;

    public PersistentMoon() {
        super();
    }

    @Override
    public String getName() {
        return name;
    }

    public void setName(final String name) {
        this.name = name;
    }

}
