
package com.bernardomg.example.solar.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import graphql.Scalars;
import graphql.schema.DataFetcher;
import graphql.schema.FieldCoordinates;
import graphql.schema.GraphQLCodeRegistry;
import graphql.schema.GraphQLObjectType;
import graphql.schema.GraphQLSchema;

@Configuration
public class GraphqlConfig {

    public GraphqlConfig() {
        super();
    }

    @Bean
    public GraphQLSchema schema() {
        final DataFetcher<String> test = env -> "response";
        return GraphQLSchema.newSchema().query(GraphQLObjectType.newObject()
                .name("query")
                .field(field -> field.name("test").type(Scalars.GraphQLString))
                .build())
                .codeRegistry(
                        GraphQLCodeRegistry.newCodeRegistry()
                                .dataFetcher(FieldCoordinates
                                        .coordinates("query", "test"), test)
                                .build())
                .build();
    }

}
