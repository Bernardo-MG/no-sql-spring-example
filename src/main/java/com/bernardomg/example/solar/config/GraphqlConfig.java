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

package com.bernardomg.example.solar.config;

import java.io.File;
import java.io.IOException;

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
    public GraphQL graphQL() throws IOException {
        final File file;
        final TypeDefinitionRegistry typeDefinitionRegistry;
        final RuntimeWiring runtimeWiring;
        final GraphQLSchema graphQLSchema;

        file = definitions.getFile();
        typeDefinitionRegistry = new SchemaParser().parse(file);
        runtimeWiring = buildRuntimeWiring();
        graphQLSchema = new SchemaGenerator()
                .makeExecutableSchema(typeDefinitionRegistry, runtimeWiring);
        return GraphQL.newGraphQL(graphQLSchema).build();
    }

    private RuntimeWiring buildRuntimeWiring() {
        return RuntimeWiring.newRuntimeWiring().type("Query",
                typeWiring -> typeWiring
                        .dataFetcher("allPlanets", allPlanetsDataFetcher)
                        .dataFetcher("planet", singlePlanetDataFetcher))
                .build();
    }

}
