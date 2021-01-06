
package com.bernardomg.example.solar.model;

public final class DefaultInfo implements Info {

    private String id;

    private String label;

    private Object value;

    public DefaultInfo() {
        super();
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

    public void setId(final String id) {
        this.id = id;
    }

    public void setLabel(final String label) {
        this.label = label;
    }

    public void setValue(final Object value) {
        this.value = value;
    }

}
