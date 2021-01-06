
package com.bernardomg.example.solar.model;

import static com.google.common.base.Preconditions.checkNotNull;

public final class DefaultInfo implements Info {

    private final String id;

    private final String label;

    private final Object value;

    public DefaultInfo(final String ident, final String lb, final Object val) {
        super();

        id = checkNotNull(ident);
        label = checkNotNull(lb);
        value = checkNotNull(val);
    }

    @Override
    public String getId() {
        return id;
    }

    @Override
    public String getLabel() {
        return label;
    }

    @Override
    public Object getValue() {
        return value;
    }

}
