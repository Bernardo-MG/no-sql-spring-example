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

package com.bernardomg.example.nosql.request;

import java.util.Map;

import com.google.common.base.MoreObjects;

/**
 * Default implementation of the query DTO.
 * 
 * @author Bernardo Mart&iacute;nez Garrido
 *
 */
public class DefaultQuery implements Query {

    /**
     * GraphQL query.
     */
    private String              query;

    /**
     * Query variables.
     */
    private Map<String, Object> variables;

    /**
     * Default constructor.
     */
    public DefaultQuery() {
        super();
    }

    @Override
    public String getQuery() {
        return query;
    }

    @Override
    public Map<String, Object> getVariables() {
        return variables;
    }

    @Override
    public void setQuery(final String value) {
        this.query = value;
    }

    @Override
    public void setVariables(final Map<String, Object> value) {
        this.variables = value;
    }

    @Override
    public final String toString() {
        return MoreObjects.toStringHelper(this).add("query", query)
                .add("variables", variables).toString();
    }

}
