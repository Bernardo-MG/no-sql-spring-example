
package com.bernardomg.example.solar.config;

import java.io.File;
import java.io.IOException;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;

import com.bernardomg.example.solar.graphql.AllPlanetsDataFetcher;
import com.bernardomg.example.solar.graphql.SinglePlanetDataFetcher;

import graphql.GraphQL;
import graphql.schema.GraphQLSchema;
import graphql.schema.idl.RuntimeWiring;
import graphql.schema.idl.SchemaGenerator;
import graphql.schema.idl.SchemaParser;
import graphql.schema.idl.TypeDefinitionRegistry;

/**
 * GraphQL configuration.
 * 
 * @author Bernardo Mart&iacute;nez Garrido
 *
 */
@Configuration
public class GraphqlConfig {

    /**
     * All planets fetcher.
     */
    @Autowired
    private AllPlanetsDataFetcher   allPlanetsDataFetcher;

    /**
     * GraphQL executor.
     */
    private GraphQL                 graphQL;

    /**
     * GraphQL definitions.
     */
    @Value("classpath:graphql/planets.graphqls")
    private Resource                definitions;

    /**
     * Single planet fetcher.
     */
    @Autowired
    private SinglePlanetDataFetcher singlePlanetDataFetcher;

    public GraphqlConfig() {
        super();
    }

    @Bean
    public GraphQL graphQL() {
        return graphQL;
    }

    @PostConstruct
    public void init() throws IOException {
        final File file = definitions.getFile();
        final TypeDefinitionRegistry typeDefinitionRegistry = new SchemaParser()
                .parse(file);
        final RuntimeWiring runtimeWiring = buildRuntimeWiring();
        final GraphQLSchema graphQLSchema = new SchemaGenerator()
                .makeExecutableSchema(typeDefinitionRegistry, runtimeWiring);
        this.graphQL = GraphQL.newGraphQL(graphQLSchema).build();
    }

    private RuntimeWiring buildRuntimeWiring() {
        return RuntimeWiring.newRuntimeWiring().type("Query",
                typeWiring -> typeWiring
                        .dataFetcher("allPlanets", allPlanetsDataFetcher)
                        .dataFetcher("planet", singlePlanetDataFetcher))
                .build();
    }

}
