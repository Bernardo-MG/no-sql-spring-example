/**
 * The MIT License (MIT)
 * <p>
 * Copyright (c) 2021 the original author or authors.
 * <p>
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * <p>
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * <p>
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

package com.bernardomg.example.nosql.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;
import org.springframework.data.neo4j.core.schema.Relationship.Direction;

import com.google.common.base.MoreObjects;

/**
 * Persistent planet. Prepared for Neo4j.
 * 
 * @author Bernardo Mart&iacute;nez Garrido
 *
 */
@Node("Planet")
public class PersistentPlanet implements Planet {

    /**
     * Planet name.
     */
    @Id
    private String               name;

    /**
     * Planet position.
     */
    private Long                 position;

    /**
     * Planet satellites.
     */
    @Relationship(type = "SATELLITE", direction = Direction.OUTGOING)
    private List<PersistentMoon> satellites = new ArrayList<>();

    public PersistentPlanet() {
        super();
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public Long getPosition() {
        return position;
    }

    @Override
    public List<PersistentMoon> getSatellites() {
        return satellites;
    }

    /**
     * Sets the name.
     * 
     * @param value
     *            the name
     */
    public void setName(final String value) {
        this.name = value;
    }

    /**
     * Sets the position.
     * 
     * @param value
     *            the position
     */
    public void setPosition(final Long value) {
        this.position = value;
    }

    /**
     * Sets the satellites.
     * 
     * @param value
     *            the satellites
     */
    public void setSatellites(final List<PersistentMoon> value) {
        this.satellites = value;
    }

    @Override
    public final String toString() {
        return MoreObjects.toStringHelper(this).add("name", name)
                .add("satellites", satellites).toString();
    }

}
