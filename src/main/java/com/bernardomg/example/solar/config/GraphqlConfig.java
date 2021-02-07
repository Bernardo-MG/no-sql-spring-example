
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

import graphql.GraphQL;
import graphql.schema.GraphQLSchema;
import graphql.schema.idl.RuntimeWiring;
import graphql.schema.idl.SchemaGenerator;
import graphql.schema.idl.SchemaParser;
import graphql.schema.idl.TypeDefinitionRegistry;

@Configuration
public class GraphqlConfig {

    @Autowired
    private AllPlanetsDataFetcher allPlanetsDataFetcher;

    private GraphQL               graphQL;

    @Value("classpath:graphql/planets.graphqls")
    private Resource              resource;

    public GraphqlConfig() {
        super();
    }

    @Bean
    public GraphQL graphQL() {
        return graphQL;
    }

    @PostConstruct
    public void init() throws IOException {
        final File file = resource.getFile();
        final TypeDefinitionRegistry typeDefinitionRegistry = new SchemaParser()
                .parse(file);
        final RuntimeWiring runtimeWiring = buildRuntimeWiring();
        final GraphQLSchema graphQLSchema = new SchemaGenerator()
                .makeExecutableSchema(typeDefinitionRegistry, runtimeWiring);
        this.graphQL = GraphQL.newGraphQL(graphQLSchema).build();
    }

    private RuntimeWiring buildRuntimeWiring() {
        return RuntimeWiring.newRuntimeWiring()
                .type("Query", typeWiring -> typeWiring
                        .dataFetcher("allPlanets", allPlanetsDataFetcher))
                .build();
    }

}
