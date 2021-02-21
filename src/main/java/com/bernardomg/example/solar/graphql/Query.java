
package com.bernardomg.example.solar.graphql;

import java.util.Map;

/**
 * A query from the frontend.
 * 
 * @author Bernardo Mart&iacute;nez Garrido
 *
 */
public interface Query {

    /**
     * Returns the query.
     * 
     * @return the query
     */
    public String getQuery();

    /**
     * Returns the query variables.
     * 
     * @return the query variables
     */
    public Map<String, Object> getVariables();

    /**
     * Sets the query.
     * 
     * @param query
     *            the query
     */
    public void setQuery(final String query);

    /**
     * Sets the query variables.
     * 
     * @param variables
     *            the query variables
     */
    public void setVariables(final Map<String, Object> variables);

}
