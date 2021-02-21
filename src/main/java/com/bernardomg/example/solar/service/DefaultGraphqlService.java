
package com.bernardomg.example.solar.service;

import static com.google.common.base.Preconditions.checkNotNull;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import graphql.ExecutionInput;
import graphql.ExecutionResult;
import graphql.GraphQL;

@Service
public class DefaultGraphqlService implements GraphqlService {

    /**
     * GraphQL executor.
     */
    private GraphQL graphql;

    /**
     * Constructs a service with the received executor.
     * 
     * @param gql
     *            GraphQL executor
     */
    @Autowired
    public DefaultGraphqlService(final GraphQL gql) {
        super();

        graphql = checkNotNull(gql);
    }

    @Override
    public ExecutionResult execute(final String query,
            final Map<String, Object> variables) {
        final ExecutionInput executionInput;

        executionInput = ExecutionInput.newExecutionInput().query(query)
                .variables(variables).build();
        return graphql.execute(executionInput);
    }

}
