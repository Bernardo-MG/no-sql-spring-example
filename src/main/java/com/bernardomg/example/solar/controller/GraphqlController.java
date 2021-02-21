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

package com.bernardomg.example.solar.controller;

import static com.google.common.base.Preconditions.checkNotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bernardomg.example.solar.request.DefaultQuery;
import com.bernardomg.example.solar.service.GraphqlService;

import graphql.ExecutionResult;

/**
 * GraphQL controller. Serves as an access point for GraphQL queries.
 * 
 * @author Bernardo Mart&iacute;nez Garrido
 */
@RestController
@RequestMapping("/api")
public class GraphqlController {

    /**
     * GraphQL service.
     */
    private final GraphqlService service;

    /**
     * Constructs a controller with the received service.
     * 
     * @param graphqlService
     *            GraphQL service
     */
    @Autowired
    public GraphqlController(final GraphqlService graphqlService) {
        super();

        service = checkNotNull(graphqlService);
    }

    /**
     * Executes a GraphQL query.
     * 
     * @param query
     *            query to execute
     * @return the result from executing the query
     */
    @PostMapping
    public ResponseEntity<ExecutionResult>
            execute(@RequestBody final DefaultQuery query) {
        final ExecutionResult execution;

        execution = service.execute(query.getQuery(), query.getVariables());
        return new ResponseEntity<>(execution, HttpStatus.OK);
    }

}
