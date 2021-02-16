
package com.bernardomg.example.solar.graphql;

import java.util.Map;

import com.google.common.base.MoreObjects;

public class Query {

    private String              query;

    private Map<String, Object> variables;

    public Query() {
        super();
    }

    public String getQuery() {
        return query;
    }

    public Map<String, Object> getVariables() {
        return variables;
    }

    public void setQuery(final String query) {
        this.query = query;
    }

    public void setVariables(final Map<String, Object> variables) {
        this.variables = variables;
    }

    @Override
    public final String toString() {
        return MoreObjects.toStringHelper(this).add("query", query)
                .add("variables", variables).toString();
    }

}
