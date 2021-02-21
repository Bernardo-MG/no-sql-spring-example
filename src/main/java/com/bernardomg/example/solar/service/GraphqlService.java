
package com.bernardomg.example.solar.service;

import java.util.Map;

import graphql.ExecutionResult;

/**
 * Service for GraphQL operations.
 * 
 * @author Bernardo Mart&iacute;nez Garrido
 *
 */
public interface GraphqlService {

    /**
     * Executes a GraphQL query.
     * 
     * @param query
     *            query to execute
     * @param variables
     *            variables for the query
     * @return query result
     */
    public ExecutionResult execute(final String query,
            final Map<String, Object> variables);

}
